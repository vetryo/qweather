# QWeather

QWeather is a Flask weather dashboard portfolio project with modern UI, resilient weather data flow, account-based saved cities, and guest-mode local saves.

## Stack

- Python / Flask
- Flask-Login + Flask-SQLAlchemy
- OpenWeather API (geocoding + forecast)
- Vanilla JS + Chart.js + Leaflet

## Key Features

- Fast city search with suggestions
- Current weather + metrics + 5-day forecast + temperature chart + map
- Saved cities for authenticated users via `/api/saved`
- Guest local saved cities in browser storage
- Contact form with API + server fallback validation
- Theme toggle and language preference persistence
- Error pages and API-safe error responses

## Project Structure

- `app.py`: Routes, API handlers, auth flow, validation, error handlers
- `models.py`: Database models and constraints
- `templates/`: Page templates and shared layout
- `static/css/styles.css`: Design system and responsive styles
- `static/js/main.js`: Home interactions, search, rendering, contact UX
- `static/js/saved.js`: Saved cities page logic (account + guest)

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Create `.env` with:
   - `OPENWEATHER_API_KEY=...`
   - `SECRET_KEY=...` (recommended)
   - Optional: `CACHE_MINUTES`, `REQUEST_TIMEOUT_SECONDS`, `DATABASE_URL`
   - Contact email delivery:
   - `CONTACT_INBOX_EMAIL=...`
   - `SMTP_HOST=...`
   - `SMTP_PORT=587`
   - `SMTP_USERNAME=...`
   - `SMTP_PASSWORD=...`
   - `SMTP_FROM_EMAIL=...`
   - `SMTP_USE_TLS=true`
   - `SMTP_USE_SSL=false`
4. Run:
   - `python app.py`

## Notes

- `Werkzeug==2.3.8` is pinned for Flask 2.3 compatibility.
- SQLite is used by default (`instance/qweather.db`) unless `DATABASE_URL` is provided.
- The contact form always saves to the database first; email notifications are sent when SMTP variables are configured.
