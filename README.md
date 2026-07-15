# Lingo Space Mini App

Demo-проект Telegram Mini App для международной языковой школы Lingo Space.

## Стек

- Flask
- python-telegram-bot
- Telegram Web Apps
- Gunicorn
- Render

## Локальный запуск

```bash
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
cp .env.example .env
python bot.py
```

Для Windows PowerShell активация:

```powershell
.venv\Scripts\Activate.ps1
```

## Переменные окружения

- `TELEGRAM_BOT_TOKEN`
- `WEBAPP_URL`
- `WEBHOOK_SECRET`

## Production

Start Command:

```bash
gunicorn bot:app --bind 0.0.0.0:$PORT
```

## Изображения

Сохраняйте подготовленные изображения в:

```text
static/images/
```

Основной hero-файл:

```text
static/images/hero_main.jpg
```
