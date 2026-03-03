from extensions import db
from flask_login import UserMixin
import datetime

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    country = db.Column(db.String(10))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    last_updated = db.Column(db.DateTime)
    data_json = db.Column(db.Text)  # full JSON cache
    temp = db.Column(db.Float)
    description = db.Column(db.String(128))
    icon_code = db.Column(db.String(10))
    humidity = db.Column(db.Integer)
    pressure = db.Column(db.Integer)
    wind_speed = db.Column(db.Float)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class SavedCity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)