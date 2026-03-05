import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///qweather.db")
SQLALCHEMY_DATABASE_URI = DATABASE_URL
SQLALCHEMY_TRACK_MODIFICATIONS = False

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not OPENWEATHER_API_KEY:
    raise RuntimeError("OPENWEATHER_API_KEY is not set. Put it in .env")

CACHE_MINUTES = int(os.getenv("CACHE_MINUTES", "30"))