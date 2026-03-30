import os
from dotenv import load_dotenv

load_dotenv()

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
