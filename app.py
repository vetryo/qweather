import datetime
import json
import os
import re
import smtplib
import ssl
from urllib.parse import urljoin, urlparse
from email.message import EmailMessage

import requests
from flask import Flask, flash, jsonify, redirect, render_template, request, url_for
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash

from extensions import db

# configuration and initialization
app = Flask(__name__)
app.config.from_pyfile(os.path.join(app.root_path, 'config.py'))
db.init_app(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'warning'

from models import City, ContactMessage, SavedCity, User  # import models after db init

SUPPORTED_LANGS = {'en', 'ru', 'kk'}
DEFAULT_LANGUAGE = 'en'
DEFAULT_TIMEOUT = 8
MIN_PASSWORD_LENGTH = 8
MAX_SEARCH_QUERY_LENGTH = 80
MAX_CONTACT_MESSAGE_LENGTH = 2000
EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.context_processor
def inject_template_globals():
    return {'current_year': datetime.datetime.utcnow().year}


def ensure_database_ready():
    try:
        db.create_all()
    except Exception:
        db.session.rollback()


with app.app_context():
    ensure_database_ready()


def is_safe_redirect_url(target):
    if not target:
        return False
    host_url = urlparse(request.host_url)
    redirect_url = urlparse(urljoin(request.host_url, target))
    return host_url.scheme == redirect_url.scheme and host_url.netloc == redirect_url.netloc


def is_valid_email(email):
    return bool(EMAIL_RE.match(email))


def normalized_language(lang):
    value = (lang or DEFAULT_LANGUAGE).strip().lower()
    return value if value in SUPPORTED_LANGS else DEFAULT_LANGUAGE


def request_timeout():
    return int(app.config.get('REQUEST_TIMEOUT_SECONDS', DEFAULT_TIMEOUT))


def contact_email_configured():
    required = (
        app.config.get('CONTACT_INBOX_EMAIL'),
        app.config.get('SMTP_HOST'),
        app.config.get('SMTP_FROM_EMAIL'),
    )
    return all(required)


def send_contact_email_notification(name, email, message, message_id):
    if not contact_email_configured():
        return False, 'Email notification is not configured on the server.'

    inbox = app.config['CONTACT_INBOX_EMAIL']
    sender = app.config['SMTP_FROM_EMAIL']
    subject = f'QWeather contact message #{message_id}'

    email_message = EmailMessage()
    email_message['Subject'] = subject
    email_message['From'] = sender
    email_message['To'] = inbox
    email_message['Reply-To'] = email
    email_message.set_content(
        '\n'.join(
            [
                'New contact message from QWeather',
                '',
                f'Message ID: {message_id}',
                f'Name: {name}',
                f'Email: {email}',
                '',
                'Message:',
                message,
            ]
        )
    )

    host = app.config['SMTP_HOST']
    port = app.config['SMTP_PORT']
    username = app.config.get('SMTP_USERNAME')
    password = app.config.get('SMTP_PASSWORD')

    try:
        if app.config.get('SMTP_USE_SSL'):
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(host, port, timeout=request_timeout(), context=context) as server:
                if username and password:
                    server.login(username, password)
                server.send_message(email_message)
        else:
            with smtplib.SMTP(host, port, timeout=request_timeout()) as server:
                if app.config.get('SMTP_USE_TLS'):
                    context = ssl.create_default_context()
                    server.starttls(context=context)
                if username and password:
                    server.login(username, password)
                server.send_message(email_message)
    except Exception as exc:
        app.logger.exception('Contact email delivery failed')
        return False, str(exc)

    return True, None


def prefers_json_response():
    if request.path.startswith('/api/'):
        return True
    return request.accept_mimetypes.best == 'application/json'


def get_cached_city(name, lat, lon):
    # Coordinate tolerance avoids collisions across same-name cities in different countries.
    tolerance = 0.03
    return (
        City.query.filter(
            City.name == name,
            City.lat.between(lat - tolerance, lat + tolerance),
            City.lon.between(lon - tolerance, lon + tolerance),
        )
        .order_by(City.last_updated.desc())
        .first()
    )


def safe_json_load(raw_json):
    try:
        return json.loads(raw_json)
    except (TypeError, json.JSONDecodeError):
        return None


def fetch_forecast(lat, lon, lang='en', units='metric'):
    """Fetch and return forecast JSON from OpenWeather."""
    api_key = app.config['OPENWEATHER_API_KEY']
    url = 'https://api.openweathermap.org/data/2.5/forecast'
    params = {'lat': lat, 'lon': lon, 'appid': api_key, 'units': units, 'lang': lang}
    response = requests.get(url, params=params, timeout=request_timeout())
    response.raise_for_status()
    return response.json()


def fetch_coordinates(query):
    """Fetch coordinates (lat, lon) from geocoding API."""
    api_key = app.config['OPENWEATHER_API_KEY']
    url = 'https://api.openweathermap.org/geo/1.0/direct'
    params = {'q': query, 'limit': 5, 'appid': api_key}
    response = requests.get(url, params=params, timeout=request_timeout())
    response.raise_for_status()
    return response.json()

def fetch_air_quality(lat, lon):
    """Fetch air quality (AQI 1-5) and components."""
    api_key = app.config['OPENWEATHER_API_KEY']
    url = 'https://api.openweathermap.org/data/2.5/air_pollution'
    params = {'lat': lat, 'lon': lon, 'appid': api_key}
    response = requests.get(url, params=params, timeout=request_timeout())
    response.raise_for_status()
    data = response.json()
    if data.get('list'):
        return data['list'][0]
    return None


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/city/<int:city_id>')
def city_detail(city_id):
    city = City.query.get_or_404(city_id)
    return render_template('city.html', city=city)


@app.route('/saved')
def saved():
    return render_template('saved.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/api/search')
def api_search():
    q = (request.args.get('q') or '').strip()

    if not q or len(q) < 2:
        return jsonify([])
    if len(q) > MAX_SEARCH_QUERY_LENGTH:
        return jsonify({'error': 'Search query is too long'}), 400

    try:
        results = fetch_coordinates(q)
    except requests.RequestException:
        return jsonify({'error': 'City search is temporarily unavailable'}), 502

    out = []
    for idx, item in enumerate(results):
        city_name = item.get('name')
        country = item.get('country')
        lat = item.get('lat')
        lon = item.get('lon')

        if city_name is None or lat is None or lon is None:
            continue

        out.append(
            {
                'name': f'{city_name}, {country}' if country else city_name,
                'lat': lat,
                'lon': lon,
                'id': idx,
            }
        )

    return jsonify(out)


@app.route('/api/city', methods=['GET'])
def api_city():
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)
    lang = normalized_language(request.args.get('lang', DEFAULT_LANGUAGE))
    units = request.args.get('units', 'metric')
    name = (request.args.get('name') or '').strip()

    if lat is None or lon is None:
        return jsonify({'error': 'Invalid coordinates'}), 400
    if not (-90 <= lat <= 90 and -180 <= lon <= 180):
        return jsonify({'error': 'Coordinates out of range'}), 400
    if not name:
        name = f'{lat:.3f}, {lon:.3f}'

    # skip cache for non-metric units to avoid mixing caches
    city = None if units != 'metric' else get_cached_city(name, lat, lon)
    refresh_minutes = app.config.get('CACHE_MINUTES', 30)

    if city and city.last_updated:
        is_fresh = datetime.datetime.utcnow() - city.last_updated < datetime.timedelta(minutes=refresh_minutes)
        if is_fresh:
            cached_payload = safe_json_load(city.data_json)
            if cached_payload:
                cached_payload['_city_id'] = city.id
                return jsonify(cached_payload)

    try:
        data = fetch_forecast(lat, lon, lang=lang, units=units)
    except requests.RequestException:
        if city and city.data_json:
            cached_payload = safe_json_load(city.data_json)
            if cached_payload:
                cached_payload['_stale'] = True
                cached_payload['_city_id'] = city.id
                return jsonify(cached_payload), 200
        return jsonify({'error': 'Failed to load weather data'}), 502

    if not data.get('list'):
        return jsonify({'error': 'Weather provider returned incomplete data'}), 502

    current = data['list'][0]
    main_data = current.get('main', {})
    weather_data = (current.get('weather') or [{}])[0]
    wind_data = current.get('wind', {})

    if not city:
        city = City(name=name, lat=lat, lon=lon)

    city.name = name
    city.country = data.get('city', {}).get('country')
    city.lat = lat
    city.lon = lon
    city.last_updated = datetime.datetime.utcnow()
    city.data_json = json.dumps(data)
    city.temp = main_data.get('temp')
    city.description = weather_data.get('description')
    city.icon_code = weather_data.get('icon')
    city.humidity = main_data.get('humidity')
    city.pressure = main_data.get('pressure')
    city.wind_speed = wind_data.get('speed')

    db.session.add(city)
    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({'error': 'Database write failed'}), 500
    try:
        air = fetch_air_quality(lat, lon)
        if air:
            data['air_quality'] = air
    except requests.RequestException:
        data['air_quality'] = None

    data['_units'] = units
    data['_city_id'] = city.id
    return jsonify(data)


@app.route('/api/saved', methods=['GET', 'POST', 'DELETE'])
@login_required
def api_saved():
    if request.method == 'GET':
        saved_rows = (
            db.session.query(City, SavedCity.created_at)
            .join(SavedCity, SavedCity.city_id == City.id)
            .filter(SavedCity.user_id == current_user.id)
            .order_by(SavedCity.created_at.desc())
            .all()
        )

        out = [
            {
                'city_id': city.id,
                'name': city.name,
                'country': city.country,
                'last_updated': city.last_updated.isoformat() if city.last_updated else None,
                'saved_at': saved_at.isoformat() if saved_at else None,
                'lat': city.lat,
                'lon': city.lon,
                'temp': city.temp,
                'description': city.description,
            }
            for city, saved_at in saved_rows
        ]
        return jsonify(out)

    if request.method == 'POST':
        payload = request.get_json(silent=True) or {}
        city_id = payload.get('city_id')

        try:
            city_id = int(city_id)
        except (TypeError, ValueError):
            return jsonify({'error': 'Invalid city id'}), 400

        city = City.query.get(city_id)
        if city is None:
            return jsonify({'error': 'City not found'}), 404

        existing = SavedCity.query.filter_by(user_id=current_user.id, city_id=city_id).first()
        if existing:
            return jsonify({'status': 'already_saved'})

        saved = SavedCity(user_id=current_user.id, city_id=city_id)
        db.session.add(saved)

        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            return jsonify({'error': 'Failed to save city'}), 500

        return jsonify({'status': 'saved'}), 201

    if request.method == 'DELETE':
        city_id = request.args.get('city_id', type=int)

        if city_id is None:
            return jsonify({'error': 'Missing city id'}), 400

        entry = SavedCity.query.filter_by(user_id=current_user.id, city_id=city_id).first()
        if not entry:
            return jsonify({'status': 'not_found'}), 404

        db.session.delete(entry)
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            return jsonify({'error': 'Failed to delete saved city'}), 500

        return jsonify({'status': 'deleted'})

    return jsonify({'error': 'Method not allowed'}), 405


@app.route('/api/contact', methods=['POST'])
def api_contact():
    payload = request.get_json(silent=True) if request.is_json else request.form

    name = (payload.get('name') or '').strip()
    email = (payload.get('email') or '').strip().lower()
    message = (payload.get('message') or '').strip()

    if not name or not email or not message:
        if prefers_json_response():
            return jsonify({'error': 'All fields are required'}), 400
        flash('All fields are required.', 'error')
        return redirect(url_for('contact'))

    if not is_valid_email(email):
        if prefers_json_response():
            return jsonify({'error': 'Invalid email address'}), 400
        flash('Please enter a valid email address.', 'error')
        return redirect(url_for('contact'))

    if len(message) > MAX_CONTACT_MESSAGE_LENGTH:
        if prefers_json_response():
            return jsonify({'error': 'Message is too long'}), 400
        flash('Message is too long.', 'error')
        return redirect(url_for('contact'))

    contact_message = ContactMessage(name=name, email=email, message=message)
    db.session.add(contact_message)

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        if prefers_json_response():
            return jsonify({'error': 'Message could not be saved'}), 500
        flash('Message could not be saved. Please try again.', 'error')
        return redirect(url_for('contact'))

    email_sent, email_error = send_contact_email_notification(name, email, message, contact_message.id)

    if not email_sent:
        saved_only_message = 'Message saved to the database, but email notification could not be sent.'
        if prefers_json_response():
            return jsonify({'status': 'saved_only', 'message': saved_only_message, 'email_error': email_error}), 202
        flash(saved_only_message, 'warning')
        return redirect(url_for('contact'))

    if prefers_json_response():
        return jsonify({'status': 'sent', 'message': 'Thanks, your message has been received.'})

    flash('Thanks, your message has been sent.', 'success')
    return redirect(url_for('contact'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    if request.method == 'POST':
        email = (request.form.get('email') or '').strip().lower()
        password = request.form.get('password') or ''

        if not is_valid_email(email):
            flash('Enter a valid email address.', 'error')
            return render_template('login.html')

        if not password:
            flash('Password is required.', 'error')
            return render_template('login.html')

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            next_url = request.args.get('next')
            if is_safe_redirect_url(next_url):
                return redirect(next_url)
            return redirect(url_for('home'))

        flash('Invalid email or password.', 'error')

    return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    if request.method == 'POST':
        email = (request.form.get('email') or '').strip().lower()
        password = request.form.get('password') or ''

        if not is_valid_email(email):
            flash('Enter a valid email address.', 'error')
            return render_template('register.html')

        if len(password) < MIN_PASSWORD_LENGTH:
            flash(f'Password must be at least {MIN_PASSWORD_LENGTH} characters.', 'error')
            return render_template('register.html')

        if User.query.filter_by(email=email).first():
            flash('Email already exists.', 'error')
            return render_template('register.html')

        hashed = generate_password_hash(password)
        user = User(email=email, password_hash=hashed)
        db.session.add(user)

        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            flash('Could not create account right now. Please try again.', 'error')
            return render_template('register.html')

        login_user(user)
        flash('Account created successfully.', 'success')
        return redirect(url_for('home'))

    return render_template('register.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('home'))


@app.errorhandler(404)
def handle_not_found(_error):
    if prefers_json_response():
        return jsonify({'error': 'Not found'}), 404
    return render_template('errors/404.html'), 404


@app.errorhandler(500)
def handle_server_error(_error):
    db.session.rollback()
    if prefers_json_response():
        return jsonify({'error': 'Internal server error'}), 500
    return render_template('errors/500.html'), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
