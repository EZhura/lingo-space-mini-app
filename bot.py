import logging
import os

from flask import Flask, jsonify, render_template, request
from telegram import Bot, InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
)

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
WEBAPP_URL = os.getenv("WEBAPP_URL", "").strip()
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "").strip()

app = Flask(__name__)

telegram_app: Application | None = None
telegram_bot: Bot | None = None


def get_webapp_keyboard() -> InlineKeyboardMarkup | None:
    if not WEBAPP_URL:
        return None

    return InlineKeyboardMarkup(
        [[InlineKeyboardButton("Открыть Lingo Space", web_app={"url": WEBAPP_URL})]]
    )


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    message = (
        "Добро пожаловать в Lingo Space 👋\n\n"
        "Здесь можно подобрать курс английского, испанского или итальянского, "
        "посмотреть расписание и записаться на бесплатный пробный урок."
    )
    await update.effective_message.reply_text(
        message,
        reply_markup=get_webapp_keyboard(),
    )


async def courses_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.effective_message.reply_text(
        "Откройте Mini App, чтобы посмотреть все курсы.",
        reply_markup=get_webapp_keyboard(),
    )


async def findcourse_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.effective_message.reply_text(
        "Ответьте на несколько вопросов в Mini App — мы предложим подходящий курс.",
        reply_markup=get_webapp_keyboard(),
    )


async def schedule_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.effective_message.reply_text(
        "Ближайшие группы и расписание доступны в Mini App.",
        reply_markup=get_webapp_keyboard(),
    )


async def teachers_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.effective_message.reply_text(
        "Познакомьтесь с преподавателями Lingo Space в Mini App.",
        reply_markup=get_webapp_keyboard(),
    )


async def trial_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.effective_message.reply_text(
        "Запишитесь на бесплатный пробный урок через Mini App.",
        reply_markup=get_webapp_keyboard(),
    )


async def contacts_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.effective_message.reply_text(
        "Контакты и адрес школы доступны в Mini App.",
        reply_markup=get_webapp_keyboard(),
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.effective_message.reply_text(
        "Используйте кнопку «Открыть Lingo Space» или команды:\n"
        "/courses — курсы\n"
        "/findcourse — подбор курса\n"
        "/schedule — расписание\n"
        "/teachers — преподаватели\n"
        "/trial — пробный урок\n"
        "/contacts — контакты"
    )


def build_telegram_application() -> Application | None:
    if not BOT_TOKEN:
        logger.warning("TELEGRAM_BOT_TOKEN is not set. Bot webhook is disabled.")
        return None

    application = Application.builder().token(BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("courses", courses_command))
    application.add_handler(CommandHandler("findcourse", findcourse_command))
    application.add_handler(CommandHandler("schedule", schedule_command))
    application.add_handler(CommandHandler("teachers", teachers_command))
    application.add_handler(CommandHandler("trial", trial_command))
    application.add_handler(CommandHandler("contacts", contacts_command))
    application.add_handler(CommandHandler("help", help_command))
    return application


telegram_app = build_telegram_application()
if BOT_TOKEN:
    telegram_bot = Bot(token=BOT_TOKEN)


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
        }
    )


@app.post("/webhook")
async def telegram_webhook():
    if telegram_app is None:
        return jsonify({"ok": False, "error": "Bot is not configured"}), 503

    if WEBHOOK_SECRET:
        received_secret = request.headers.get(
            "X-Telegram-Bot-Api-Secret-Token", ""
        )
        if received_secret != WEBHOOK_SECRET:
            return jsonify({"ok": False, "error": "Invalid secret"}), 403

    payload = request.get_json(silent=True)
    if not payload:
        return jsonify({"ok": False, "error": "Invalid JSON"}), 400

    update = Update.de_json(payload, telegram_app.bot)
    await telegram_app.initialize()
    await telegram_app.process_update(update)

    return jsonify({"ok": True})


@app.post("/api/trial")
def create_trial_request():
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
