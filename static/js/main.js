const STORAGE_KEYS = {
    theme: 'qweather_theme',
    language: 'qweather_language',
    previousSearches: 'qweather_previous_searches',
    guestSaved: 'qweather_guest_saved_cities'
};

const DEFAULT_THEME = 'dark';
const DEFAULT_LANGUAGE = 'en';
const POPULAR_CITIES = [
    'New York, US', 'London, UK', 'Tokyo, JP', 'Paris, FR', 'Sydney, AU',
    'Dubai, AE', 'Singapore, SG', 'Toronto, CA', 'Almaty, KZ', 'Istanbul, TR',
    'Los Angeles, US', 'Berlin, DE', 'Madrid, ES', 'Seoul, KR', 'Mexico City, MX',
    'Jakarta, ID', 'Bangkok, TH', 'Cape Town, ZA', 'Buenos Aires, AR', 'Rome, IT'
];
const TRANSLATIONS = {
    en: {
        'nav-home': 'Home',
        'nav-saved': 'Saved',
        'nav-contact': 'Contact',
        'nav-login': 'Login',
        'nav-register': 'Register',
        'nav-logout': 'Logout',
        'footer-note': 'Reliable weather intelligence with clean UX and portfolio-grade engineering.',
        'home-eyebrow': 'Weather Intelligence',
        'home-title': 'Plan the day with confidence.',
        'home-subtitle': 'Search any city and instantly get a clean, high-signal forecast view with current conditions, trend chart, map context, and quick saving.',
        'home-search-label': 'City search',
        'home-search-btn': 'Search',
        'home-search-help': 'Use at least 2 letters. Pick a suggestion for best accuracy.',
        'home-what-title': 'What you get',
        'home-what-1': 'Current conditions with key metrics',
        'home-what-2': '5-day forecast cards and trend chart',
        'home-what-3': 'Interactive map and recent search history',
        'home-what-4': 'Saved city flow for account and guest mode',
        'home-empty-title': 'Ready when you are',
        'home-empty-body': 'Search a city to load the dashboard. Recent searches and saved items help you return faster.',
        'saved-eyebrow': 'Saved Locations',
        'saved-title': 'Your weather shortcuts',
        'saved-subtitle': 'Access cities synced to your account and open snapshots in one click.',
        'saved-account-title': 'Account saved cities',
        'saved-account-caption': 'Synced with your database profile',
        'saved-guest-title': 'Guest saved cities',
        'saved-guest-caption': 'Stored locally on this browser only',
        'contact-eyebrow': 'Contact',
        'contact-title': 'Send feedback or project inquiries',
        'contact-subtitle': 'Share bugs, ideas, or collaboration requests. Messages are persisted to the project database.',
        'contact-form-title': 'Message form',
        'contact-name-label': 'Name',
        'contact-email-label': 'Email',
        'contact-message-label': 'Message',
        'contact-send': 'Send message',
        'contact-storage': 'Stored securely in the local database.',
        'login-eyebrow': 'Account Access',
        'login-title': 'Welcome back',
        'login-subtitle': 'Sign in to sync saved cities and keep your forecast workflow consistent.',
        'login-form-title': 'Login',
        'login-email': 'Email',
        'login-password': 'Password',
        'login-btn': 'Login',
        'register-eyebrow': 'Create Account',
        'register-title': 'Join QWeather',
        'register-subtitle': 'Create an account to save cities in the cloud and return to them instantly.',
        'register-form-title': 'Register',
        'register-email': 'Email',
        'register-password': 'Password',
        'register-hint': 'Use at least 8 characters for better account security.',
        'register-btn': 'Create account',
        'register-have-account': 'Already have an account',
        'cta-register': 'Create account',
        'cta-login': 'Login',
        'metric-humidity': 'Humidity',
        'metric-wind': 'Wind',
        'metric-pressure': 'Pressure',
        'metric-clouds': 'Cloudiness',
        'metric-aqi': 'AQI',
        'metric-pop': 'Precip %',
        'metric-sunrise': 'Sunrise',
        'metric-sunset': 'Sunset',
        'feels-like': 'Feels like'
    },
    ru: {
        'nav-home': 'Главная',
        'nav-saved': 'Сохраненные',
        'nav-contact': 'Контакты',
        'nav-login': 'Войти',
        'nav-register': 'Регистрация',
        'nav-logout': 'Выйти',
        'footer-note': 'Надежный погодный сервис с чистым UX и профессиональной архитектурой.',
        'home-eyebrow': 'Погодная аналитика',
        'home-title': 'Планируйте день уверенно.',
        'home-subtitle': 'Ищите города и получайте чистый прогноз с текущими данными, графиком и картой.',
        'home-search-label': 'Поиск города',
        'home-search-btn': 'Искать',
        'home-search-help': 'Используйте минимум 2 буквы. Выбирайте из подсказок.',
        'home-what-title': 'Что внутри',
        'home-what-1': 'Текущие условия и метрики',
        'home-what-2': '5-дневный прогноз и температурный график',
        'home-what-3': 'Интерактивная карта и история поиска',
        'home-what-4': 'Сохранение городов для аккаунта и гостя',
        'home-empty-title': 'Готово к поиску',
        'home-empty-body': 'Найдите город, чтобы открыть дашборд. Недавние поиски помогут вернуться быстрее.',
        'saved-eyebrow': 'Сохраненные города',
        'saved-title': 'Ваши ярлыки погоды',
        'saved-subtitle': 'Доступ к городам из аккаунта и быстрым снимкам.',
        'saved-account-title': 'Города аккаунта',
        'saved-account-caption': 'Синхронизировано с профилем',
        'saved-guest-title': 'Гостевые города',
        'saved-guest-caption': 'Хранятся локально в браузере',
        'contact-eyebrow': 'Контакты',
        'contact-title': 'Отправьте отзыв или запрос',
        'contact-subtitle': 'Сообщайте об ошибках и идеях. Сообщения сохраняются в базе.',
        'contact-form-title': 'Форма сообщения',
        'contact-name-label': 'Имя',
        'contact-email-label': 'Email',
        'contact-message-label': 'Сообщение',
        'contact-send': 'Отправить',
        'contact-storage': 'Хранится безопасно в базе данных.',
        'login-eyebrow': 'Доступ',
        'login-title': 'С возвращением',
        'login-subtitle': 'Войдите, чтобы синхронизировать сохраненные города.',
        'login-form-title': 'Вход',
        'login-email': 'Email',
        'login-password': 'Пароль',
        'login-btn': 'Войти',
        'register-eyebrow': 'Создать аккаунт',
        'register-title': 'Присоединяйтесь к QWeather',
        'register-subtitle': 'Сохраняйте города в облаке и возвращайтесь быстро.',
        'register-form-title': 'Регистрация',
        'register-email': 'Email',
        'register-password': 'Пароль',
        'register-hint': 'Используйте не менее 8 символов.',
        'register-btn': 'Создать аккаунт',
        'register-have-account': 'У меня уже есть аккаунт',
        'cta-register': 'Создать аккаунт',
        'cta-login': 'Войти',
        'metric-humidity': 'Влажность',
        'metric-wind': 'Ветер',
        'metric-pressure': 'Давление',
        'metric-clouds': 'Облачность',
        'metric-aqi': 'AQI',
        'metric-pop': 'Вероятность осадков',
        'metric-sunrise': 'Рассвет',
        'metric-sunset': 'Закат',
        'feels-like': 'Ощущается как'
    },
    kk: {
        'nav-home': 'Басты',
        'nav-saved': 'Сақталған',
        'nav-contact': 'Байланыс',
        'nav-login': 'Кіру',
        'nav-register': 'Тіркелу',
        'nav-logout': 'Шығу',
        'footer-note': 'Сенімді ауа райы сервисі, таза UX және кәсіби архитектура.',
        'home-eyebrow': 'Ауа райы аналитикасы',
        'home-title': 'Күніңізді сенімді жоспарлаңыз.',
        'home-subtitle': 'Қаланы тауып, нақты мәліметтерді, график пен картаны дереу алыңыз.',
        'home-search-label': 'Қала іздеу',
        'home-search-btn': 'Іздеу',
        'home-search-help': 'Кемінде 2 әріп енгізіңіз. Ұсынысты таңдаңыз.',
        'home-what-title': 'Не бар',
        'home-what-1': 'Ағымдағы жағдай және метрикалар',
        'home-what-2': '5 күндік болжам және температура графигі',
        'home-what-3': 'Интерактивті карта және іздеу тарихы',
        'home-what-4': 'Аккаунт және қонақ режиміне сақталған қалалар',
        'home-empty-title': 'Бастауға дайын',
        'home-empty-body': 'Дашбордты көру үшін қала іздеңіз. Жуырдағы іздеулер қайтуды жеңілдетеді.',
        'saved-eyebrow': 'Сақталған қалалар',
        'saved-title': 'Ауа райы жарлықтарыңыз',
        'saved-subtitle': 'Аккаунтқа синхрондалған қалаларға жылдам қол жеткізіңіз.',
        'saved-account-title': 'Аккаунт қалалары',
        'saved-account-caption': 'Профильмен синхрондалған',
        'saved-guest-title': 'Қонақ қалалары',
        'saved-guest-caption': 'Браузерде жергілікті сақталады',
        'contact-eyebrow': 'Байланыс',
        'contact-title': 'Кері байланыс немесе жоба сұранысы',
        'contact-subtitle': 'Қателер мен идеяларды жіберіңіз. Хабарламалар базаға сақталады.',
        'contact-form-title': 'Хабарлама формасы',
        'contact-name-label': 'Аты',
        'contact-email-label': 'Email',
        'contact-message-label': 'Хабарлама',
        'contact-send': 'Жіберу',
        'contact-storage': 'Дерекқорда қауіпсіз сақталады.',
        'login-eyebrow': 'Қатынау',
        'login-title': 'Қайта келдіңіз',
        'login-subtitle': 'Сақталған қалаларды синхрондау үшін кіріңіз.',
        'login-form-title': 'Кіру',
        'login-email': 'Email',
        'login-password': 'Құпиясөз',
        'login-btn': 'Кіру',
        'register-eyebrow': 'Аккаунт ашу',
        'register-title': 'QWeather-ге қосылыңыз',
        'register-subtitle': 'Қалаларды бұлтта сақтап, тез оралыңыз.',
        'register-form-title': 'Тіркелу',
        'register-email': 'Email',
        'register-password': 'Құпиясөз',
        'register-hint': 'Құпиясөз кемінде 8 таңба болуы керек.',
        'register-btn': 'Тіркелу',
        'register-have-account': 'Аккаунтым бар',
        'cta-register': 'Тіркелу',
        'cta-login': 'Кіру',
        'metric-humidity': 'Ылғалдылық',
        'metric-wind': 'Жел',
        'metric-pressure': 'Қысым',
        'metric-clouds': 'Бұлттылық',
        'metric-aqi': 'AQI',
        'metric-pop': 'Жауын %',
        'metric-sunrise': 'Күн шығу',
        'metric-sunset': 'Күн бату',
        'feels-like': 'Сезіледі'
    }
};

const WEATHER_TRANSLATIONS = {
    en: {
        'clear sky': 'Clear sky',
        'few clouds': 'Few clouds',
        'scattered clouds': 'Scattered clouds',
        'broken clouds': 'Broken clouds',
        'overcast clouds': 'Overcast',
        'light rain': 'Light rain',
        'moderate rain': 'Moderate rain',
        'heavy intensity rain': 'Heavy rain',
        rain: 'Rain',
        drizzle: 'Drizzle',
        thunderstorm: 'Thunderstorm',
        snow: 'Snow',
        mist: 'Mist',
        smoke: 'Smoke',
        haze: 'Haze',
        dust: 'Dust',
        fog: 'Fog'
    },
    ru: {
        'clear sky': 'Ясно',
        'few clouds': 'Малооблачно',
        'scattered clouds': 'Рассеянные облака',
        'broken clouds': 'Облачно',
        'overcast clouds': 'Пасмурно',
        'light rain': 'Небольшой дождь',
        'moderate rain': 'Дождь',
        'heavy intensity rain': 'Сильный дождь',
        rain: 'Дождь',
        drizzle: 'Морось',
        thunderstorm: 'Гроза',
        snow: 'Снег',
        mist: 'Туман',
        smoke: 'Дымка',
        haze: 'Мгла',
        dust: 'Пыльно',
        fog: 'Туман'
    },
    kk: {
        'clear sky': 'Ашық аспан',
        'few clouds': 'Аз бұлтты',
        'scattered clouds': 'Сирек бұлттар',
        'broken clouds': 'Бұлтты',
        'overcast clouds': 'Қалың бұлт',
        'light rain': 'Әлсіз жаңбыр',
        'moderate rain': 'Жаңбыр',
        'heavy intensity rain': 'Күшті жаңбыр',
        rain: 'Жаңбыр',
        drizzle: 'Сіркіреме',
        thunderstorm: 'Найзағайлы жаңбыр',
        snow: 'Қар',
        mist: 'Тұман',
        smoke: 'Түтін',
        haze: 'Бұлдырау',
        dust: 'Шаңды',
        fog: 'Тұман'
    }
};


document.addEventListener('DOMContentLoaded', () => {
    initThemeAndLanguage();
    initNavbarScroll();
    initHomePage();
    initContactForm();
});


function initThemeAndLanguage() {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const langButtons = Array.from(document.querySelectorAll('.lang-chip'));

    const initialTheme = Math.random() < 0.5 ? 'light' : 'dark';
    applyTheme(initialTheme);
    localStorage.setItem(STORAGE_KEYS.theme, initialTheme);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(nextTheme);
            localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
            document.dispatchEvent(new CustomEvent('qweather:themechange'));
        });
    }

    const storedLanguage = localStorage.getItem(STORAGE_KEYS.language) || DEFAULT_LANGUAGE;
    setLanguageUI(storedLanguage);
    langButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang || DEFAULT_LANGUAGE;
            localStorage.setItem(STORAGE_KEYS.language, lang);
            setLanguageUI(lang);
            applyTranslations(lang);
            if (window.location.pathname === '/') {
                window.location.reload();
            }
        });
    });
    applyTranslations(storedLanguage);

    function setLanguageUI(lang) {
        langButtons.forEach((b) => {
            b.classList.toggle('is-active', (b.dataset.lang || DEFAULT_LANGUAGE) === lang);
        });
    }
}


function applyTheme(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀' : '◐';
        toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
}


function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
        return;
    }

    const onScroll = () => {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 6);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}


function initHomePage() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) {
        return;
    }
    const initialValue = searchInput.value.trim();
    if (initialValue && (initialValue.match(/^0\\.0{2,}/) || initialValue.match(/^0\\.0+\\s*,\\s*0\\.0+/))) {
        searchInput.value = '';
    }

    const searchForm = document.getElementById('search-form');
    const searchButton = document.getElementById('search-button');
    const suggestions = document.getElementById('suggestions');
    const searchStatus = document.getElementById('search-status');
    const contentSection = document.getElementById('content-section');
    const emptyState = document.getElementById('empty-state');
    const prevList = document.getElementById('prev-list');
    const currentCard = document.getElementById('current-weather');
    const metricsCard = document.getElementById('metrics');
    const forecastCards = document.getElementById('forecast-cards');
    const chartCanvas = document.getElementById('temp-chart');
    const mapDiv = document.getElementById('map');
    const mapFallback = document.getElementById('map-fallback');
    const mapCaption = document.getElementById('map-caption');
    const saveButton = document.getElementById('save-city-btn');
    const saveStatus = document.getElementById('save-status');
    const microMetricsCard = document.getElementById('micro-metrics');

    const isAuthenticated = document.body.dataset.authenticated === 'true';
    let activeCity = null;
    let latestPayload = null;
    let suggestionTimer = null;
    let currentMap = null;
    let currentChart = null;
    let placeholderTimer = null;

    renderPreviousSearches();
    loadCityFromUrlParams();
    startPlaceholderRotation();

    if (searchForm) {
        searchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query.length < 2) {
                setStatus(searchStatus, 'Enter at least 2 letters to search.', 'warning');
                return;
            }

            try {
                setLoadingState(true);
                const matches = await fetchJson(`/api/search?q=${encodeURIComponent(query)}`);
                if (!Array.isArray(matches) || matches.length === 0) {
                    setStatus(searchStatus, 'No matching cities found.', 'warning');
                    clearSuggestions();
                    return;
                }

                clearSuggestions();
                await loadCity(matches[0]);
            } catch (error) {
                setStatus(searchStatus, error.message || 'Search failed. Try again.', 'error');
            } finally {
                setLoadingState(false);
            }
        });
    }

    searchInput.addEventListener('input', () => {
        clearTimeout(suggestionTimer);
        stopPlaceholderRotation();
        const query = searchInput.value.trim();

        if (query.length < 2) {
            clearSuggestions();
            startPlaceholderRotation();
            return;
        }

        suggestionTimer = window.setTimeout(async () => {
            try {
                const list = await fetchJson(`/api/search?q=${encodeURIComponent(query)}`);
                renderSuggestions(Array.isArray(list) ? list : []);
            } catch (_error) {
                clearSuggestions();
                startPlaceholderRotation();
            }
        }, 260);
    });

    document.addEventListener('click', (event) => {
        if (!suggestions) {
            return;
        }

        const clickedInsideSuggestions = suggestions.contains(event.target);
        const clickedInput = event.target === searchInput;

        if (!clickedInsideSuggestions && !clickedInput) {
            clearSuggestions();
        }
    });

    if (saveButton) {
        saveButton.addEventListener('click', async () => {
            if (!activeCity) {
                setStatus(saveStatus, 'Search for a city first.', 'warning');
                return;
            }

            saveButton.disabled = true;
            const originalText = saveButton.textContent;
            saveButton.textContent = 'Saving...';

            try {
                if (isAuthenticated) {
                    await saveToAccount(activeCity);
                    setStatus(saveStatus, 'City saved to your account.', 'success');
                } else {
                    saveToGuestStorage(activeCity);
                    setStatus(saveStatus, 'City saved locally in this browser.', 'success');
                }
            } catch (error) {
                setStatus(saveStatus, error.message || 'Could not save city.', 'error');
            } finally {
                saveButton.textContent = originalText;
                configureSaveButton();
            }
        });
    }

    document.addEventListener('qweather:themechange', () => {
        if (latestPayload) {
            renderWeather(latestPayload, { preserveStatus: true });
        }
    });

    async function loadCity(result) {
        const lat = Number(result.lat);
        const lon = Number(result.lon);
        const name = String(result.name || '').trim();

        if (Number.isNaN(lat) || Number.isNaN(lon) || !name) {
            throw new Error('Selected city has invalid coordinates.');
        }

        setStatus(searchStatus, 'Loading weather data...', 'info');

        const language = localStorage.getItem(STORAGE_KEYS.language) || DEFAULT_LANGUAGE;
        const params = new URLSearchParams({
            name,
            lat: String(lat),
            lon: String(lon),
            lang: language
        });

        const data = await fetchJson(`/api/city?${params.toString()}`);
        renderWeather(data);
        triggerNudges(data);

        savePreviousSearch(name);
        renderPreviousSearches();

        searchInput.value = name;
        clearSuggestions();

        setStatus(searchStatus, data._stale ? 'Showing cached data because live fetch failed.' : 'Weather loaded.', data._stale ? 'warning' : 'success');
    }

    function renderWeather(data, options = {}) {
        const forecastList = Array.isArray(data?.list) ? data.list : [];
        if (!forecastList.length || !data.city) {
            setStatus(searchStatus, 'Weather data is incomplete for this city.', 'error');
            return;
        }

        const current = forecastList[0] || {};
        const currentMain = current.main || {};
        const currentWeather = (current.weather || [])[0] || {};
        const currentWind = current.wind || {};
        const cityData = data.city || {};
        const coords = cityData.coord || {};
        const windSuffix = ' m/s';

        latestPayload = data;

        const displayName = [cityData.name, cityData.country].filter(Boolean).join(', ');
        const displayTime = formatDateTime(current.dt);
        const lang = localStorage.getItem(STORAGE_KEYS.language) || DEFAULT_LANGUAGE;
        const feelsLike = formatTemp(currentMain.feels_like);
        const description = translateWeatherDescription(currentWeather.description || 'No description', lang);
        const iconCode = currentWeather.icon;

        currentCard.innerHTML = `
            <div class="weather-top-row">
                <div>
                    <div class="weather-city">${escapeHtml(displayName || 'Selected city')}</div>
                    <div class="weather-time">${escapeHtml(displayTime)}</div>
                </div>
            </div>
            <div class="weather-main">
                <div class="weather-main-icon">
                    ${iconCode ? `<img src="https://openweathermap.org/img/wn/${encodeURIComponent(iconCode)}@2x.png" alt="${escapeHtml(description)}">` : '<div class="icon-placeholder"></div>'}
                </div>
                <div>
                    <div class="weather-main-temp">${formatTemp(currentMain.temp)}</div>
                    <div class="weather-main-desc">${escapeHtml(description)}</div>
                </div>
            </div>
            <div class="feels">${t('feels-like', lang)} ${feelsLike}${data._stale ? ' | Cached data' : ''}</div>
        `;

        metricsCard.innerHTML = `
            <div class="metric-item">
                <span class="metric-label">${t('metric-humidity', lang)}</span>
                <span class="metric-value">${formatValue(currentMain.humidity, '%')}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">${t('metric-wind', lang)}</span>
                <span class="metric-value">${formatValue(currentWind.speed, windSuffix)}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">${t('metric-pressure', lang)}</span>
                <span class="metric-value">${formatValue(currentMain.pressure, ' hPa')}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">${t('metric-clouds', lang)}</span>
                <span class="metric-value">${formatValue((current.clouds || {}).all, '%')}</span>
            </div>
        `;

        if (microMetricsCard) {
            const popRaw = Number.isFinite(current.pop) ? current.pop : Number.isFinite(forecastList[1]?.pop) ? forecastList[1].pop : null;
            const popPercent = Number.isFinite(popRaw) ? `${Math.round(Math.min(Math.max(popRaw, 0), 1) * 100)}%` : '--';
            const sunriseText = formatTime(cityData.sunrise, lang);
            const sunsetText = formatTime(cityData.sunset, lang);
            const aqiText = formatAqi((data.air_quality || {}).main?.aqi, lang);

            const aqiEl = document.getElementById('aqi-value');
            const popEl = document.getElementById('pop-value');
            const sunriseEl = document.getElementById('sunrise-value');
            const sunsetEl = document.getElementById('sunset-value');

            if (aqiEl) aqiEl.textContent = aqiText;
            if (popEl) popEl.textContent = popPercent;
            if (sunriseEl) sunriseEl.textContent = sunriseText;
            if (sunsetEl) sunsetEl.textContent = sunsetText;

            microMetricsCard.classList.remove('hidden');
        }

        forecastCards.innerHTML = '';
        const dailyForecast = [];
        for (let idx = 0; idx < forecastList.length; idx += 8) {
            dailyForecast.push(forecastList[idx]);
        }

        dailyForecast.slice(0, 5).forEach((item) => {
            const weather = (item.weather || [])[0] || {};
            const day = formatDay(item.dt);
            const minTemp = formatTemp((item.main || {}).temp_min);
            const maxTemp = formatTemp((item.main || {}).temp_max);
            const text = translateWeatherDescription(weather.description || 'No data', lang);
            const icon = weather.icon;

            const card = document.createElement('article');
            card.className = 'forecast-card';
            card.innerHTML = `
                <div class="forecast-day">${escapeHtml(day)}</div>
                ${icon ? `<img src="https://openweathermap.org/img/wn/${encodeURIComponent(icon)}.png" alt="${escapeHtml(text)}">` : ''}
                <div class="forecast-temp">${escapeHtml(minTemp)} / ${escapeHtml(maxTemp)}</div>
                <div class="small">${escapeHtml(text)}</div>
            `;
            forecastCards.appendChild(card);
        });

        renderChart(forecastList, currentChart, chartCanvas);
        currentChart = window.__qweatherChart || null;

        if (mapCaption) {
            const latText = Number.isFinite(coords.lat) ? coords.lat.toFixed(3) : '--';
            const lonText = Number.isFinite(coords.lon) ? coords.lon.toFixed(3) : '--';
            mapCaption.textContent = `Lat ${latText}, Lon ${lonText}`;
        }

        if (currentMap) {
            currentMap.remove();
            currentMap = null;
        }

        if (mapFallback) {
            mapFallback.classList.add('hidden');
            mapFallback.textContent = '';
        }

        if (Number.isFinite(coords.lat) && Number.isFinite(coords.lon)) {
            currentMap = renderMap(coords.lat, coords.lon, displayName, mapDiv, mapFallback);
        } else if (mapFallback) {
            setStatus(mapFallback, 'Map is unavailable because coordinates are missing.', 'warning');
            mapFallback.classList.remove('hidden');
        }

        activeCity = {
            name: displayName || resultLabelFromFallback(data),
            lat: Number(coords.lat),
            lon: Number(coords.lon),
            cityId: Number(data._city_id) || null,
            temp: Number.isFinite(Number(currentMain.temp)) ? Number(currentMain.temp) : null,
            description,
            country: cityData.country || ''
        };

        configureSaveButton();

        if (contentSection) {
            contentSection.classList.remove('hidden');
        }

        if (emptyState) {
            emptyState.classList.add('hidden');
        }

        currentCard.classList.remove('hidden');
        metricsCard.classList.remove('hidden');

        if (!options.preserveStatus) {
            setStatus(saveStatus, '', 'info');
        }
    }

    function renderSuggestions(items) {
        if (!suggestions) {
            return;
        }

        suggestions.innerHTML = '';

        if (!items.length) {
            return;
        }

        items.slice(0, 6).forEach((item) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'suggestions-item';
            button.textContent = item.name;
            button.addEventListener('click', async () => {
                try {
                    setLoadingState(true);
                    await loadCity(item);
                } catch (error) {
                    setStatus(searchStatus, error.message || 'Failed to load selected city.', 'error');
                } finally {
                    setLoadingState(false);
                }
            });
            suggestions.appendChild(button);
        });
    }

    function clearSuggestions() {
        if (suggestions) {
            suggestions.innerHTML = '';
        }
    }

    function startPlaceholderRotation() {
        if (!searchInput) return;
        searchInput.classList.add('placeholder-animated');
        rotatePlaceholder();
        placeholderTimer = setInterval(rotatePlaceholder, 2600);
    }

    function stopPlaceholderRotation() {
        if (placeholderTimer) {
            clearInterval(placeholderTimer);
            placeholderTimer = null;
        }
        if (searchInput) {
            searchInput.classList.remove('placeholder-animated');
        }
    }

    function rotatePlaceholder() {
        if (!searchInput || searchInput.value.trim()) return;
        const next = POPULAR_CITIES[Math.floor(Math.random() * POPULAR_CITIES.length)];
        searchInput.setAttribute('placeholder', next);
        if (searchInput.value.trim().match(/^0\\.0{2,}/)) {
            searchInput.value = '';
        }
    }

    function setLoadingState(isLoading) {
        if (!searchButton) {
            return;
        }
        searchButton.disabled = isLoading;
        searchButton.textContent = isLoading ? 'Loading...' : 'Search';
    }

    function configureSaveButton() {
        if (!saveButton) {
            return;
        }

        if (!activeCity) {
            saveButton.disabled = true;
            return;
        }

        if (isAuthenticated && !activeCity.cityId) {
            saveButton.disabled = true;
            setStatus(saveStatus, 'City ID missing. Please reload weather data.', 'warning');
            return;
        }

        saveButton.disabled = false;
    }

    async function saveToAccount(city) {
        if (!city.cityId) {
            throw new Error('City cannot be saved yet. Reload and try again.');
        }

        const payload = await fetchJson('/api/saved', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ city_id: city.cityId })
        });

        if (payload.status === 'already_saved') {
            throw new Error('City is already saved in your account.');
        }
    }

    function saveToGuestStorage(city) {
        const current = readJsonStorage(STORAGE_KEYS.guestSaved, []);
        const exists = current.some((item) => {
            return item.name === city.name && Math.abs((item.lat || 0) - city.lat) < 0.0001 && Math.abs((item.lon || 0) - city.lon) < 0.0001;
        });

        if (exists) {
            throw new Error('City is already saved locally.');
        }

        current.unshift({
            name: city.name,
            country: city.country,
            lat: city.lat,
            lon: city.lon,
            temp: city.temp,
            description: city.description,
            savedAt: new Date().toISOString()
        });

        writeJsonStorage(STORAGE_KEYS.guestSaved, current.slice(0, 20));
    }

    function savePreviousSearch(name) {
        const current = readJsonStorage(STORAGE_KEYS.previousSearches, []);
        const next = [name, ...current.filter((item) => item !== name)].slice(0, 12);
        writeJsonStorage(STORAGE_KEYS.previousSearches, next);
    }

    function renderPreviousSearches() {
        if (!prevList) {
            return;
        }

        const previous = readJsonStorage(STORAGE_KEYS.previousSearches, []);
        prevList.innerHTML = '';

        if (!previous.length) {
            const li = document.createElement('li');
            li.textContent = 'No recent searches yet.';
            li.style.cursor = 'default';
            prevList.appendChild(li);
            return;
        }

        previous.forEach((name) => {
            const li = document.createElement('li');
            li.textContent = name;
            li.addEventListener('click', async () => {
                try {
                    setLoadingState(true);
                    const matches = await fetchJson(`/api/search?q=${encodeURIComponent(name)}`);
                    if (Array.isArray(matches) && matches.length) {
                        await loadCity(matches[0]);
                    } else {
                        setStatus(searchStatus, 'Could not resolve this previous search.', 'warning');
                    }
                } catch (error) {
                    setStatus(searchStatus, error.message || 'Failed to reload this city.', 'error');
                } finally {
                    setLoadingState(false);
                }
            });
            prevList.appendChild(li);
        });
    }

    function loadCityFromUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const lat = Number(params.get('lat'));
        const lon = Number(params.get('lon'));
        const name = (params.get('name') || '').trim();

        if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
            if (Math.abs(lat) < 0.001 && Math.abs(lon) < 0.001) {
                searchInput.value = '';
                return;
            }
            const fallbackName = name || `${lat.toFixed(3)}, ${lon.toFixed(3)}`;
            searchInput.value = fallbackName;
            loadCity({ name: fallbackName, lat, lon }).catch((error) => {
                setStatus(searchStatus, error.message || 'Failed to open city from URL.', 'error');
            });
            return;
        }

        const q = (params.get('q') || '').trim();
        if (q) {
            searchInput.value = q;
        }
    }
}


function renderChart(forecastList, currentChart, canvas) {
    if (!canvas || typeof Chart === 'undefined') {
        return;
    }

    if (currentChart && typeof currentChart.destroy === 'function') {
        currentChart.destroy();
    }

    const labels = forecastList.map((item) => formatDateLabel(item.dt));
    const temps = forecastList.map((item) => {
        const temp = Number((item.main || {}).temp);
        return Number.isFinite(temp) ? temp : null;
    });

    const accent = cssVar('--accent');
    const muted = cssVar('--text-muted');
    const grid = document.body.classList.contains('light') ? 'rgba(15, 23, 42, 0.09)' : 'rgba(148, 163, 184, 0.18)';

    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height || 320);
    gradient.addColorStop(0, withAlpha(accent, 0.35));
    gradient.addColorStop(1, withAlpha(accent, 0));

    window.__qweatherChart = new Chart(context, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Temperature',
                    data: temps,
                    borderColor: accent,
                    backgroundColor: gradient,
                    borderWidth: 2.5,
                    pointRadius: 1.8,
                    pointHoverRadius: 4.2,
                    fill: true,
                    tension: 0.36,
                    spanGaps: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        label: (ctx) => ` ${ctx.parsed.y}°C`
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: grid, drawBorder: false },
                    ticks: {
                        color: muted,
                        maxTicksLimit: 8,
                        padding: 6
                    },
                    border: { display: false }
                },
                y: {
                    grid: { color: grid, drawBorder: false },
                    ticks: {
                        color: muted,
                        callback: (value) => `${value}°`
                    },
                    border: { display: false }
                }
            }
        }
    });
}

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
}

function mapConditionToKeyword(desc = '') {
    const key = desc.toLowerCase();
    if (key.includes('storm') || key.includes('thunder')) return 'stormy';
    if (key.includes('rain') || key.includes('drizzle')) return 'rainy';
    if (key.includes('snow')) return 'snowy';
    if (key.includes('fog') || key.includes('mist') || key.includes('haze')) return 'foggy';
    if (key.includes('wind')) return 'windy';
    if (key.includes('cloud')) return 'cloudy';
    if (key.includes('sun') || key.includes('clear')) return 'sunny';
    return 'sunny';
}

function triggerNudges(data) {
    if (!data || !data.list || !data.list.length || !data.city) return;
    const current = data.list[0] || {};
    const currentWeather = (current.weather || [])[0] || {};
    const currentMain = current.main || {};
    const currentWind = current.wind || {};
    const condition = mapConditionToKeyword(currentWeather.description || currentWeather.main || '');
    const timeOfDay = getTimeOfDay();

    const nudges = generateWeatherNudges(
        {
            condition,
            temperature: currentMain.temp,
            humidity: currentMain.humidity,
            uv_index: Number(current.uvi),
            wind_speed: currentWind.speed
        },
        timeOfDay,
        { mood: 'neutral', preferences: [] }
    );

    if (!Array.isArray(nudges) || !nudges.length) {
        return;
    }
    showNudgeToast(nudges.slice(0, 4));
}

function showNudgeToast(nudges) {
    let stack = document.getElementById('toast-stack');
    if (!stack) {
        stack = document.createElement('div');
        stack.id = 'toast-stack';
        stack.className = 'toast-stack';
        document.body.appendChild(stack);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    const title = document.createElement('div');
    title.className = 'toast-title';
    title.textContent = 'Weather nudges';

    const list = document.createElement('ul');
    list.className = 'toast-list';
    nudges.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="toast-tag">${escapeHtml(item.category)}</span><span class="toast-text">${escapeHtml(item.nudge)}</span>`;
        list.appendChild(li);
    });

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'toast-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });

    toast.appendChild(closeBtn);
    toast.appendChild(title);
    toast.appendChild(list);

    stack.appendChild(toast);

    window.setTimeout(() => {
        toast.classList.add('visible');
    }, 10);

    window.setTimeout(() => {
        toast.remove();
    }, 10000);
}


function renderMap(lat, lon, label, mapDiv, mapFallback) {
    if (!mapDiv) {
        return null;
    }

    if (typeof L === 'undefined') {
        if (mapFallback) {
            setStatus(mapFallback, 'Map library failed to load.', 'error');
            mapFallback.classList.remove('hidden');
        }
        return null;
    }

    const isLight = document.body.classList.contains('light');
    const tileUrl = isLight
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    const map = L.map(mapDiv).setView([lat, lon], 10);

    L.tileLayer(tileUrl, {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup(escapeHtml(label || 'Selected city'));

    window.setTimeout(() => {
        map.invalidateSize();
    }, 0);

    return map;
}


function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) {
        return;
    }

    const status = document.getElementById('contact-status');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            name: (form.querySelector('#name')?.value || '').trim(),
            email: (form.querySelector('#email')?.value || '').trim(),
            message: (form.querySelector('#message')?.value || '').trim()
        };

        if (!payload.name || !payload.email || !payload.message) {
            setStatus(status, 'Fill out all fields before sending.', 'warning');
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const result = await fetchJson('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(payload)
            });

            setStatus(status, result.message || 'Message sent successfully.', 'success');
            form.reset();
        } catch (error) {
            setStatus(status, error.message || 'Failed to send message.', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send message';
            }
        }
    });
}


async function fetchJson(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            ...(options.headers || {})
        },
        ...options
    });

    const text = await response.text();
    let payload = {};

    if (text) {
        try {
            payload = JSON.parse(text);
        } catch (_error) {
            payload = {};
        }
    }

    if (!response.ok) {
        throw new Error(payload.error || `Request failed (${response.status})`);
    }

    return payload;
}


function setStatus(element, message, type = 'info') {
    if (!element) {
        return;
    }

    element.textContent = message || '';
    element.classList.remove('is-success', 'is-error', 'is-warning');

    if (type === 'success') {
        element.classList.add('is-success');
    } else if (type === 'error') {
        element.classList.add('is-error');
    } else if (type === 'warning') {
        element.classList.add('is-warning');
    }
}


function readJsonStorage(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) {
            return fallback;
        }

        const parsed = JSON.parse(raw);
        return Array.isArray(fallback) && !Array.isArray(parsed) ? fallback : parsed;
    } catch (_error) {
        return fallback;
    }
}


function writeJsonStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function formatDateTime(unixSeconds) {
    if (!Number.isFinite(unixSeconds)) {
        return 'Date unavailable';
    }

    const language = localStorage.getItem(STORAGE_KEYS.language) || DEFAULT_LANGUAGE;
    return new Date(unixSeconds * 1000).toLocaleString(language, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}


function formatDateLabel(unixSeconds) {
    if (!Number.isFinite(unixSeconds)) {
        return '--';
    }

    const language = localStorage.getItem(STORAGE_KEYS.language) || DEFAULT_LANGUAGE;
    return new Date(unixSeconds * 1000).toLocaleString(language, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit'
    });
}


function formatDay(unixSeconds) {
    if (!Number.isFinite(unixSeconds)) {
        return '--';
    }

    const language = localStorage.getItem(STORAGE_KEYS.language) || DEFAULT_LANGUAGE;
    return new Date(unixSeconds * 1000).toLocaleDateString(language, {
        weekday: 'short'
    });
}


function formatTemp(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
        return '--';
    }
    return `${Math.round(numeric)}°`;
}


function formatValue(value, suffix = '') {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
        return '--';
    }
    return `${numeric}${suffix}`;
}


function capitalize(value) {
    if (!value) {
        return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
}


function resultLabelFromFallback(data) {
    const city = data?.city || {};
    const label = [city.name, city.country].filter(Boolean).join(', ');
    return label || 'Selected city';
}


function cssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
}


function withAlpha(hexColor, alpha) {
    const clean = hexColor.replace('#', '');
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
        return hexColor;
    }

    const r = Number.parseInt(clean.slice(0, 2), 16);
    const g = Number.parseInt(clean.slice(2, 4), 16);
    const b = Number.parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function t(key, lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANGUAGE];
    if (dict && dict[key]) return dict[key];
    if (TRANSLATIONS[DEFAULT_LANGUAGE] && TRANSLATIONS[DEFAULT_LANGUAGE][key]) {
        return TRANSLATIONS[DEFAULT_LANGUAGE][key];
    }
    return key;
}


function applyTranslations(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANGUAGE];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
        const key = node.getAttribute('data-i18n');
        if (key && dict[key]) {
            node.textContent = dict[key];
        }
    });
}

function translateWeatherDescription(description, lang) {
    const key = String(description || '').toLowerCase().trim();
    const dict = WEATHER_TRANSLATIONS[lang] || WEATHER_TRANSLATIONS[DEFAULT_LANGUAGE];
    const translated = dict && dict[key];
    const value = translated || description || 'Weather';
    return capitalize(value);
}

function formatTime(unixSeconds, lang) {
    if (!Number.isFinite(unixSeconds)) {
        return '--';
    }
    return new Date(unixSeconds * 1000).toLocaleTimeString(lang || DEFAULT_LANGUAGE, {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatAqi(aqi, lang) {
    const scale = {
        en: {
            1: 'Good',
            2: 'Fair',
            3: 'Moderate',
            4: 'Poor',
            5: 'Very poor'
        },
        ru: {
            1: 'Отлично',
            2: 'Хорошо',
            3: 'Средне',
            4: 'Плохо',
            5: 'Очень плохо'
        },
        kk: {
            1: 'Жақсы',
            2: 'Қанағат',
            3: 'Орташа',
            4: 'Нашар',
            5: 'Өте нашар'
        }
    };
    const group = scale[lang] || scale[DEFAULT_LANGUAGE];
    if (!Number.isFinite(Number(aqi))) {
        return '--';
    }
    const rating = group[Number(aqi)] || 'Index';
    return `${rating} (${Number(aqi)})`;
}

function shuffleArray(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function generateWeatherNudges(weather = {}, time_of_day = 'morning', user_profile = {}) {
    const condition = String(weather.condition || 'sunny').toLowerCase();
    const temperature = Number(weather.temperature);
    const humidity = Number(weather.humidity);
    const uvIndex = Number(weather.uv_index);
    const windSpeed = Number(weather.wind_speed);
    const timeKey = ['morning', 'afternoon', 'evening', 'night'].includes(time_of_day) ? time_of_day : 'morning';
    const preferences = Array.isArray(user_profile.preferences) ? user_profile.preferences.map((p) => p.toLowerCase()) : [];
    const mood = (user_profile.mood || 'neutral').toLowerCase();

    const conditionBank = {
        sunny: [
            { category: 'Adventure/Exploration', nudge: 'Sunny day → 20-min walk to a new café' },
            { category: 'Fitness & Training', nudge: 'Do a quick outdoor jog or park laps' },
            { category: 'Energy & Mood', nudge: 'Open windows for sunlight, play upbeat music, stretch 5 minutes' }
        ],
        rainy: [
            { category: 'Productivity & Focus', nudge: 'Rainy vibe → run a deep-work sprint indoors' },
            { category: 'Mindfulness', nudge: 'Cozy rain → tea plus 5 slow breaths by the window' },
            { category: 'Social Life', nudge: 'Invite a friend for board games or café catch-up' }
        ],
        windy: [
            { category: 'Fitness & Training', nudge: 'Windy day → brisk walk with a windbreaker' },
            { category: 'Digital Life', nudge: 'Queue an audiobook or podcast for commutes' },
            { category: 'Mindfulness', nudge: 'Before heading out, take 3 grounding breaths' }
        ],
        foggy: [
            { category: 'Energy & Mood', nudge: 'Foggy start → bright light, upbeat playlist, light stretch' },
            { category: 'Productivity & Focus', nudge: 'Use the cozy mood for focused reading or writing' },
            { category: 'Mindfulness', nudge: 'Do a 3-minute box-breathing session' }
        ],
        stormy: [
            { category: 'Productivity & Focus', nudge: 'Stormy weather → batch indoor tasks or planning' },
            { category: 'Mindfulness', nudge: 'Pause: notice sounds, then list 3 things you control today' },
            { category: 'Social Life', nudge: 'Send one thoughtful check-in text while you stay inside' }
        ],
        snowy: [
            { category: 'Adventure/Exploration', nudge: 'Snowy day → short photo walk, layered up' },
            { category: 'Energy & Mood', nudge: 'Warm drink + favorite playlist to lift the mood' },
            { category: 'Fitness & Training', nudge: 'Try indoor mobility or bodyweight circuit' }
        ],
        cloudy: [
            { category: 'Productivity & Focus', nudge: 'Cloudy day → schedule 45-min focus block' },
            { category: 'Energy & Mood', nudge: 'Step outside for 5 minutes of fresh air' },
            { category: 'Nutrition', nudge: 'Prep a colorful snack to brighten the desk' }
        ],
        default: [
            { category: 'Energy & Mood', nudge: 'Open curtains, hydrate, and do a 5-min stretch' },
            { category: 'Productivity & Focus', nudge: 'Write today’s top 3 tasks before messaging apps' }
        ]
    };

    const timeBank = {
        morning: [
            { category: 'Energy & Mood', nudge: 'Morning → hydrate and 5-min mobility before screens' },
            { category: 'Productivity & Focus', nudge: 'List top 3 priorities while coffee brews' }
        ],
        afternoon: [
            { category: 'Productivity & Focus', nudge: 'Afternoon dip? Take a 7-min walk or stretch break' },
            { category: 'Nutrition', nudge: 'Refill water and add a fruit snack' }
        ],
        evening: [
            { category: 'Social Life', nudge: 'Evening → text a friend for a short walk' },
            { category: 'Mindfulness', nudge: 'Dim lights early and tidy one small area' }
        ],
        night: [
            { category: 'Mindfulness', nudge: 'Night → 10-min digital detox before bed' },
            { category: 'Energy & Mood', nudge: 'Note 3 wins + 1 intention for tomorrow' }
        ]
    };

    const preferenceBank = [];
    if (preferences.includes('gym')) {
        preferenceBank.push({ category: 'Fitness & Training', nudge: 'Block 30 minutes for strength or HIIT today' });
    }
    if (preferences.includes('reading')) {
        preferenceBank.push({ category: 'Productivity & Focus', nudge: 'Set a 20-minute reading block with a warm drink' });
    }
    if (preferences.includes('socializing')) {
        preferenceBank.push({ category: 'Social Life', nudge: 'Send one invite for a coffee or walk this week' });
    }

    const derivedBank = [];
    if (Number.isFinite(temperature) && temperature > 30) {
        derivedBank.push({ category: 'Nutrition', nudge: 'Hot day → carry water and pick light meals' });
    } else if (Number.isFinite(temperature) && temperature < 5) {
        derivedBank.push({ category: 'Energy & Mood', nudge: 'Cold day → warm layers and 10-min indoor cardio' });
    }
    if (Number.isFinite(humidity) && humidity > 75) {
        derivedBank.push({ category: 'Mindfulness', nudge: 'Humid weather → slow breaths and lighter pace outdoors' });
    }
    if (Number.isFinite(uvIndex) && uvIndex >= 7) {
        derivedBank.push({ category: 'Energy & Mood', nudge: 'High UV → seek shade and wear sunscreen' });
    }
    if (Number.isFinite(windSpeed) && windSpeed > 35) {
        derivedBank.push({ category: 'Safety', nudge: 'Gusty winds → choose sheltered routes or stay indoors' });
    }
    if (mood === 'low') {
        derivedBank.push({ category: 'Energy & Mood', nudge: 'Low mood? Step outside for 5 deep breaths' });
    }

    const dynamic = [];
    if (Number.isFinite(temperature)) {
        const t = Math.round(temperature);
        if (t >= 30) dynamic.push({ category: 'Nutrition', nudge: `Hot ${t}°C → hydrate, choose light meals, short shaded walks` });
        else if (t <= 5) dynamic.push({ category: 'Energy & Mood', nudge: `Chilly ${t}°C → warm layers, 8-min indoor mobility` });
        else dynamic.push({ category: 'Fitness & Training', nudge: `Mild ${t}°C → 15-min brisk walk to boost focus` });
    }
    if (Number.isFinite(humidity) && humidity >= 80) {
        dynamic.push({ category: 'Mindfulness', nudge: 'Humid air → slow nose breaths, keep pace easy outdoors' });
    }
    if (Number.isFinite(uvIndex) && uvIndex >= 7) {
        dynamic.push({ category: 'Safety', nudge: 'High UV → sunscreen + cap, seek shade at midday' });
    }
    if (Number.isFinite(windSpeed) && windSpeed >= 40) {
        dynamic.push({ category: 'Safety', nudge: 'Gusty winds → pick sheltered streets or stay indoors' });
    }

    const pool = [
        ...(conditionBank[condition] || conditionBank.default),
        ...(timeBank[timeKey] || []),
        ...preferenceBank,
        ...derivedBank,
        ...dynamic
    ];

    const shuffled = shuffleArray(pool);
    const unique = [];
    const seen = new Set();
    for (const item of shuffled) {
        if (!item || !item.nudge || seen.has(item.nudge)) {
            continue;
        }
        unique.push(item);
        seen.add(item.nudge);
        if (unique.length >= 7) break;
    }

    const fallback = conditionBank.default || [];
    while (unique.length < 3 && fallback.length) {
        const next = fallback.shift();
        if (next && !seen.has(next.nudge)) {
            unique.push(next);
            seen.add(next.nudge);
        }
    }

    return unique.slice(0, Math.max(3, unique.length));
}

