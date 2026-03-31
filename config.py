import os
from dotenv import load_dotenv

load_dotenv()


def env_flag(name, default='false'):
    return os.getenv(name, default).strip().lower() in {'1', 'true', 'yes', 'on'}


SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')

default_database_url = 'sqlite:///qweather.db'
if os.getenv('VERCEL'):
    # Vercel's deployment filesystem is read-only outside /tmp.
    default_database_url = 'sqlite:////tmp/qweather.db'

DATABASE_URL = os.getenv('DATABASE_URL', default_database_url)
SQLALCHEMY_DATABASE_URI = DATABASE_URL
SQLALCHEMY_TRACK_MODIFICATIONS = False

SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'

OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
if not OPENWEATHER_API_KEY:
    raise RuntimeError('OPENWEATHER_API_KEY is not set. Put it in .env')

CACHE_MINUTES = int(os.getenv('CACHE_MINUTES', '30'))
REQUEST_TIMEOUT_SECONDS = int(os.getenv('REQUEST_TIMEOUT_SECONDS', '8'))

CONTACT_INBOX_EMAIL = os.getenv('CONTACT_INBOX_EMAIL', '').strip()
SMTP_HOST = os.getenv('SMTP_HOST', '').strip()
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USERNAME = os.getenv('SMTP_USERNAME', '').strip()
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
SMTP_FROM_EMAIL = os.getenv('SMTP_FROM_EMAIL', SMTP_USERNAME or CONTACT_INBOX_EMAIL).strip()
SMTP_USE_TLS = env_flag('SMTP_USE_TLS', 'true')
SMTP_USE_SSL = env_flag('SMTP_USE_SSL', 'false')
