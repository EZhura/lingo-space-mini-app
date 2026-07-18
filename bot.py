import logging
import os

import httpx
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request

load_dotenv()

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
WEBAPP_URL = os.getenv("WEBAPP_URL", "").strip()
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "").strip()

TELEGRAM_API_URL = (
    f"https://api.telegram.org/bot{BOT_TOKEN}"
    if BOT_TOKEN
    else ""
)

app = Flask(__name__)


def build_webapp_markup() -> dict | None:
    """Возвращает кнопки для Mini App и веб-версии."""
    if not WEBAPP_URL:
        return None

    return {
        "inline_keyboard": [
            [
                {
                    "text": "Открыть Mini App",
                    "web_app": {"url": WEBAPP_URL},
                }
            ],
            [
                {
                    "text": "Открыть в браузере",
                    "url": WEBAPP_URL,
                }
            ],
        ]
    }


def send_telegram_message(
    chat_id: int,
    text: str,
    reply_markup: dict | None = None,
) -> None:
    """Отправляет сообщение через Telegram Bot API."""
    if not BOT_TOKEN or not TELEGRAM_API_URL:
        raise RuntimeError("TELEGRAM_BOT_TOKEN is not configured.")

    payload: dict = {
        "chat_id": chat_id,
        "text": text,
    }

    if reply_markup:
        payload["reply_markup"] = reply_markup

    response = httpx.post(
        f"{TELEGRAM_API_URL}/sendMessage",
        json=payload,
        timeout=15,
    )
    response.raise_for_status()


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "bot_configured": bool(BOT_TOKEN),
            "webapp_url_configured": bool(WEBAPP_URL),
            "webhook_secret_configured": bool(WEBHOOK_SECRET),
        }
    )


@app.post("/webhook")
def telegram_webhook():
    """Принимает обновления Telegram и отвечает на команды."""
    if not BOT_TOKEN:
        return jsonify(
            {"ok": False, "error": "Bot is not configured"}
        ), 503

    if WEBHOOK_SECRET:
        received_secret = request.headers.get(
            "X-Telegram-Bot-Api-Secret-Token",
            "",
        )

        if received_secret != WEBHOOK_SECRET:
            logger.warning("Webhook request with invalid secret.")
            return jsonify(
                {"ok": False, "error": "Invalid secret"}
            ), 403

    payload = request.get_json(silent=True)

    if not payload:
        return jsonify(
            {"ok": False, "error": "Invalid JSON"}
        ), 400

    message = payload.get("message") or {}
    chat = message.get("chat") or {}
    chat_id = chat.get("id")
    text = str(message.get("text", "")).strip()

    if not chat_id or not text:
        return jsonify({"ok": True})

    command = text.split()[0].split("@")[0].lower()
    markup = build_webapp_markup()

    responses = {
        "/start": (
    "Добро пожаловать в Lingo Space 👋\n\n"
    "Это демо Mini App международной языковой школы.\n\n"
    "В приложении вы можете:\n"
    "• подобрать курс\n"
    "• посмотреть программы\n"
    "• найти ближайшую группу\n"
    "• выбрать формат обучения\n"
    "• записаться на бесплатный пробный урок\n\n"
    "Нажмите одну из кнопок ниже."
),
        "/courses": (
            "Откройте Mini App, чтобы посмотреть программы "
            "английского, испанского и итальянского."
        ),
        "/findcourse": (
            "Ответьте на несколько вопросов в Mini App — "
            "мы предложим подходящий курс."
        ),
        "/schedule": (
            "Ближайшие группы и расписание доступны в Mini App."
        ),
        "/teachers": (
            "Познакомьтесь с преподавателями Lingo Space "
            "в Mini App."
        ),
        "/trial": (
            "Запишитесь на бесплатный пробный урок через Mini App."
        ),
        "/contacts": (
            "Контакты и адрес школы доступны в Mini App."
        ),
        "/help": (
            "Доступные команды:\n"
            "/courses — курсы\n"
            "/findcourse — подбор курса\n"
            "/schedule — расписание\n"
            "/teachers — преподаватели\n"
            "/trial — пробный урок\n"
            "/contacts — контакты"
        ),
    }

    response_text = responses.get(
        command,
        "Откройте Lingo Space, чтобы подобрать курс или "
        "записаться на пробный урок.",
    )

    try:
        send_telegram_message(
            chat_id=chat_id,
            text=response_text,
            reply_markup=markup,
        )
    except (httpx.HTTPError, RuntimeError):
        logger.exception("Failed to send Telegram message.")
        return jsonify(
            {"ok": False, "error": "Telegram API error"}
        ), 502

    return jsonify({"ok": True})


@app.post("/api/trial")
def create_trial_request():
    """Принимает заявку на пробный урок из Mini App."""
    payload = request.get_json(silent=True) or {}

    name = str(payload.get("name", "")).strip()
    contact = str(payload.get("contact", "")).strip()
    language = str(payload.get("language", "")).strip()

    if not name or not contact or not language:
        return jsonify(
            {
                "ok": False,
                "error": "Заполните имя, контакт и язык.",
            }
        ), 400

    logger.info(
        "New trial request | name=%s | contact=%s | language=%s",
        name,
        contact,
        language,
    )

    return jsonify(
        {
            "ok": True,
            "message": "Заявка отправлена. Мы скоро свяжемся с вами.",
        }
    )


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)