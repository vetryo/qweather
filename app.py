import os
import json
import datetime
from flask import Flask, render_template, request, redirect, url_for, jsonify, flash
from extensions import db
from flask_login import (
    LoginManager, UserMixin, login_user, logout_user,
    current_user, login_required
)
from werkzeug.security import generate_password_hash, check_password_hash
import requests

# configuration and initialization
app = Flask(__name__)
app.config.from_pyfile(os.path.join(app.root_path, "config.py"))
db.init_app(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

from models import City, User, SavedCity, ContactMessage  # import models after db init

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def fetch_forecast(lat, lon, lang='en', units='metric'):
    """Fetch and return the 5‑day / 3‑hour forecast JSON from OpenWeather."""
    api_key = app.config['OPENWEATHER_API_KEY']
    url = 'https://api.openweathermap.org/data/2.5/forecast'
    params = {'lat': lat, 'lon': lon, 'appid': api_key, 'units': units, 'lang': lang}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def fetch_coordinates(query):
    """Fetch coordinates (lat, lon) from geocoding API."""
    api_key = app.config['OPENWEATHER_API_KEY']
    url = 'https://api.openweathermap.org/geo/1.0/direct'
    params = {'q': query, 'limit': 5, 'appid': api_key}
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    return resp.json()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/city/<int:city_id>')
def city_detail(city_id):
    city = City.query.get_or_404(city_id)
    return render_template('city.html', city=city)

@app.route('/saved')
@login_required
def saved():
    return render_template('saved.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/api/search')
def api_search():
    q = request.args.get('q', '')
    results = fetch_coordinates(q)
    # simplify the results for the frontend
    out = []
    for idx, item in enumerate(results):
        out.append({
            'name': f"{item.get('name')}, {item.get('country')}",
            'lat': item.get('lat'),
            'lon': item.get('lon'),
            'id': idx  # temporary id used on frontend
        })
    return jsonify(out)

@app.route('/api/city', methods=['GET'])
def api_city():
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)
    lang = request.args.get('lang', 'en')
    name = request.args.get('name')
    if not lat or not lon:
        return jsonify({'error': 'Invalid coordinates'}), 400

    # check if city is cached
    city = City.query.filter_by(name=name).first()
    refresh_minutes = app.config.get('CACHE_MINUTES', 30)
    if city and city.last_updated and (
        datetime.datetime.utcnow() - city.last_updated < datetime.timedelta(minutes=refresh_minutes)
    ):
        return jsonify(json.loads(city.data_json))

    # fetch fresh forecast
    data = fetch_forecast(lat, lon, lang=lang)
    # update or create city record
    if not city:
        city = City(name=name, country=data['city']['country'], lat=lat, lon=lon)
    city.last_updated = datetime.datetime.utcnow()
    city.data_json = json.dumps(data)
    city.temp = data['list'][0]['main']['temp']
    city.description = data['list'][0]['weather'][0]['description']
    city.icon_code = data['list'][0]['weather'][0]['icon']
    city.humidity = data['list'][0]['main']['humidity']
    city.pressure = data['list'][0]['main']['pressure']
    city.wind_speed = data['list'][0]['wind']['speed']
    db.session.add(city)
    db.session.commit()
    return jsonify(data)

@app.route('/api/saved', methods=['GET', 'POST', 'DELETE'])
@login_required
def api_saved():
    if request.method == 'GET':
        saved_entries = SavedCity.query.filter_by(user_id=current_user.id).all()
        out = []
        for entry in saved_entries:
            city = City.query.get(entry.city_id)
            if city:
                out.append({'city_id': city.id, 'name': city.name, 'country': city.country})
        return jsonify(out)
    elif request.method == 'POST':
        city_id = request.json.get('city_id')
        if not city_id:
            return jsonify({'error': 'No city id'}), 400
        existing = SavedCity.query.filter_by(user_id=current_user.id, city_id=city_id).first()
        if not existing:
            saved = SavedCity(user_id=current_user.id, city_id=city_id)
            db.session.add(saved)
            db.session.commit()
        return jsonify({'status': 'saved'})
    elif request.method == 'DELETE':
        city_id = request.args.get('city_id', type=int)
        entry = SavedCity.query.filter_by(user_id=current_user.id, city_id=city_id).first()
        if entry:
            db.session.delete(entry)
            db.session.commit()
        return jsonify({'status': 'deleted'})

@app.route('/api/contact', methods=['POST'])
def api_contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    if not name or not email or not message:
        return jsonify({'error': 'All fields required'}), 400
    cm = ContactMessage(name=name, email=email, message=message)
    db.session.add(cm)
    db.session.commit()
    return jsonify({'status': 'sent'})

# Authentication routes (optional)
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('home'))
        flash('Invalid credentials')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        if User.query.filter_by(email=email).first():
            flash('Email already exists')
        else:
            hashed = generate_password_hash(password)
            user = User(email=email, password_hash=hashed)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return redirect(url_for('home'))
    return render_template('register.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)