import logging
import os

import httpx
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request

load_dotenv()

logging.basicConfig(format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",level=logging.INFO)
logger=logging.getLogger(__name__)

BOT_TOKEN=os.getenv("TELEGRAM_BOT_TOKEN","").strip()
WEBAPP_URL=os.getenv("WEBAPP_URL","").strip()
WEBHOOK_SECRET=os.getenv("WEBHOOK_SECRET","").strip()
ADMIN_CHAT_ID=os.getenv("ADMIN_CHAT_ID","").strip()
TELEGRAM_API_URL=f"https://api.telegram.org/bot{BOT_TOKEN}" if BOT_TOKEN else ""

app=Flask(__name__)

def build_webapp_markup():
    if not WEBAPP_URL:return None
    return {"inline_keyboard":[
        [{"text":"Открыть Mini App","web_app":{"url":WEBAPP_URL}}],
        [{"text":"Открыть в браузере","url":WEBAPP_URL}]
    ]}

def send_telegram_message(chat_id,text,reply_markup=None):
    if not TELEGRAM_API_URL:raise RuntimeError("Bot token is missing")
    payload={"chat_id":chat_id,"text":text}
    if reply_markup:payload["reply_markup"]=reply_markup
    response=httpx.post(f"{TELEGRAM_API_URL}/sendMessage",json=payload,timeout=15)
    response.raise_for_status()

@app.get("/")
def index():
    return render_template("index.html")

@app.get("/health")
def health():
    return jsonify({
        "status":"ok",
        "bot_configured":bool(BOT_TOKEN),
        "webapp_url_configured":bool(WEBAPP_URL),
        "webhook_secret_configured":bool(WEBHOOK_SECRET),
        "admin_chat_configured":bool(ADMIN_CHAT_ID)
    })

@app.post("/webhook")
def telegram_webhook():
    if not BOT_TOKEN:return jsonify({"ok":False,"error":"Bot is not configured"}),503
    if WEBHOOK_SECRET:
        secret=request.headers.get("X-Telegram-Bot-Api-Secret-Token","")
        if secret!=WEBHOOK_SECRET:return jsonify({"ok":False,"error":"Invalid secret"}),403
    payload=request.get_json(silent=True)
    if not payload:return jsonify({"ok":False,"error":"Invalid JSON"}),400
    message=payload.get("message") or {}
    chat_id=(message.get("chat") or {}).get("id")
    text=str(message.get("text","")).strip()
    if not chat_id or not text:return jsonify({"ok":True})
    command=text.split()[0].split("@")[0].lower()
    responses={
      "/start":"Добро пожаловать в Lingo Space 👋\n\nЭто демо Mini App международной языковой школы.\n\nВ приложении вы можете:\n• подобрать курс\n• посмотреть программы\n• найти ближайшую группу\n• выбрать формат обучения\n• записаться на бесплатный пробный урок\n\nНажмите одну из кнопок ниже.",
      "/courses":"Откройте Mini App, чтобы посмотреть программы английского, испанского и итальянского.",
      "/findcourse":"Ответьте на несколько вопросов в Mini App — мы предложим подходящий курс.",
      "/schedule":"Ближайшие группы и расписание доступны в Mini App.",
      "/teachers":"Познакомьтесь с преподавателями Lingo Space в Mini App.",
      "/trial":"Запишитесь на бесплатный пробный урок через Mini App.",
      "/contacts":"Контакты и адрес школы доступны в Mini App.",
      "/help":"Доступные команды:\n/courses — курсы\n/findcourse — подбор курса\n/schedule — расписание\n/teachers — преподаватели\n/trial — пробный урок\n/contacts — контакты"
    }
    try:send_telegram_message(chat_id,responses.get(command,"Откройте Lingo Space, чтобы подобрать курс или записаться на пробный урок."),build_webapp_markup())
    except (httpx.HTTPError,RuntimeError):
        logger.exception("Failed to send Telegram message")
        return jsonify({"ok":False,"error":"Telegram API error"}),502
    return jsonify({"ok":True})

@app.post("/api/trial")
def create_trial_request():
    data=request.get_json(silent=True) or {}
    fields={key:str(data.get(key,"")).strip() for key in ("name","contact","language","course","format","preferred_time")}
    if any(not value for value in fields.values()):
        return jsonify({"ok":False,"error":"Заполните все обязательные поля."}),400
    if not ADMIN_CHAT_ID:
        return jsonify({"ok":False,"error":"Канал заявок пока не настроен."}),503
    username=str(data.get("telegram_username","")).strip()
    user_id=data.get("telegram_user_id")
    tg_context=f"@{username}" if username else (f"ID {user_id}" if user_id else "не указан")
    text=(
      "🎓 Новая заявка Lingo Space\n\n"
      f"Имя: {fields['name']}\n"
      f"Контакт: {fields['contact']}\n"
      f"Язык: {fields['language']}\n"
      f"Курс: {fields['course']}\n"
      f"Формат: {fields['format']}\n"
      f"Удобное время: {fields['preferred_time']}\n\n"
      f"Источник: {str(data.get('source','Web')).strip()}\n"
      f"Telegram: {tg_context}"
    )
    try:send_telegram_message(ADMIN_CHAT_ID,text)
    except (httpx.HTTPError,RuntimeError):
        logger.exception("Failed to send trial request")
        return jsonify({"ok":False,"error":"Не удалось отправить заявку. Попробуйте позже."}),502
    return jsonify({"ok":True,"message":"Заявка отправлена."})

if __name__=="__main__":
    app.run(host="0.0.0.0",port=int(os.getenv("PORT","5000")),debug=True)
