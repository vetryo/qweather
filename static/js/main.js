document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 8);
});
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const langSelect = document.getElementById('lang-select');
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');
    const prevList = document.getElementById('prev-list');
    const contentSection = document.getElementById('content-section'); // NEW

    // Restore theme and language from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.remove('dark', 'light');
    body.classList.add(savedTheme);
    toggle.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    const savedLang = localStorage.getItem('lang') || 'en';
    langSelect.value = savedLang;

    toggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
        body.classList.toggle('dark');
        body.classList.toggle('light');
        localStorage.setItem('theme', newTheme);
        toggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    });

    langSelect.addEventListener('change', () => {
        localStorage.setItem('lang', langSelect.value);
        location.reload();
    });

    // Search suggestions
    let timer;
    searchInput.addEventListener('input', () => {
        clearTimeout(timer);
        const query = searchInput.value.trim();
        if (!query) {
            suggestions.innerHTML = '';
            return;
        }
        timer = setTimeout(() => {
            fetch(`/api/search?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(list => {
                    suggestions.innerHTML = '';
                    list.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'suggestions-item'; // 👈 NEW CLASS
                        div.innerText = item.name;
                        div.dataset.lat = item.lat;
                        div.dataset.lon = item.lon;
                        div.addEventListener('click', () => {
                            searchInput.value = item.name;
                            suggestions.innerHTML = '';
                            loadCity(item.name, item.lat, item.lon);
                        });
                        suggestions.appendChild(div);
                    });
                });
        }, 300);
    });

    function savePreviousSearch(cityName) {
        let prev = JSON.parse(localStorage.getItem('previous') || '[]');
        prev = [cityName, ...prev.filter(n => n !== cityName)].slice(0, 10);
        localStorage.setItem('previous', JSON.stringify(prev));
        renderPrevious();
    }

    function renderPrevious() {
        const prev = JSON.parse(localStorage.getItem('previous') || '[]');
        prevList.innerHTML = '';
        prev.forEach(name => {
            const li = document.createElement('li');
            li.innerText = name;
            li.addEventListener('click', () => {
                fetch(`/api/search?q=${encodeURIComponent(name)}`)
                    .then(res => res.json())
                    .then(list => {
                        if (list.length > 0) {
                            const first = list[0];
                            loadCity(first.name, first.lat, first.lon);
                        }
                    });
            });
            prevList.appendChild(li);
        });
    }

    renderPrevious();

    function loadCity(name, lat, lon) {
        const lang = localStorage.getItem('lang') || 'en';
        fetch(`/api/city?name=${encodeURIComponent(name)}&lat=${lat}&lon=${lon}&lang=${lang}`)
            .then(res => res.json())
            .then(data => {
                savePreviousSearch(name);
                renderWeather(data);
            });
    }

    function getChartTheme() {
        const cs = getComputedStyle(document.body); // ВАЖНО: body, а не documentElement
        const accent = (cs.getPropertyValue('--accent') || '#5fb3ff').trim();
        const fg = (cs.getPropertyValue('--fg') || '#f5f5f5').trim();
        const muted = (cs.getPropertyValue('--fg-muted') || '#a7a7b8').trim();
    
        const isLight = document.body.classList.contains('light');
    
        return {
            accent,
            fg,
            muted,
            grid: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
            gridStrong: isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.10)',
            tooltipBg: isLight ? 'rgba(255,255,255,0.96)' : 'rgba(12,14,20,0.94)',
            tooltipBorder: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.10)',
            tooltipText: isLight ? '#111' : '#f5f5f5'
        };
    }
    
    function formatShortDateLabel(unixSeconds, lang = 'en') {
        const d = new Date(unixSeconds * 1000);
        return d.toLocaleString(lang, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function renderWeather(data) {
        const currentCard = document.getElementById('current-weather');
        const metricsRow = document.getElementById('metrics');
        const forecastCards = document.getElementById('forecast-cards');
        const chartCanvas = document.getElementById('temp-chart');
        const mapDiv = document.getElementById('map');

        // make the whole content section visible
        if (contentSection) {
            contentSection.classList.remove('hidden');
        }

        // ensure we have lang for date formatting
        const lang = localStorage.getItem('lang') || 'en';

        // fill current weather
        const current = data.list[0];
        const cityName = `${data.city.name}, ${data.city.country}`;
        currentCard.innerHTML = `
            <div class="weather-top-row">
                <div>
                    <div class="weather-city">${cityName}</div>
                    <div class="weather-time">${new Date(current.dt * 1000).toLocaleString()}</div>
                </div>
            </div>
            <div class="weather-main">
                <div class="weather-main-icon">
                    <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="">
                </div>
                <div>
                    <div class="weather-main-temp">${Math.round(current.main.temp)}°</div>
                    <div class="weather-main-desc">${current.weather[0].description}</div>
                </div>
            </div>
            <div class="feels">
                Feels like:
                <span title="Temperature adjusted for wind and humidity">
                    ${Math.round(current.main.feels_like)}°
                </span>
            </div>
        `;
        currentCard.classList.remove('hidden');

        // metrics row – prettier structure
        metricsRow.innerHTML = `
            <div class="metric-item">
                <span class="metric-label">Humidity</span>
                <span class="metric-value">${current.main.humidity}%</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Wind</span>
                <span class="metric-value">${current.wind.speed} m/s</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Pressure</span>
                <span class="metric-value">${current.main.pressure} hPa</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Cloudiness</span>
                <span class="metric-value">${current.clouds.all}%</span>
            </div>
        `;
        metricsRow.classList.remove('hidden');

        // forecast cards
        forecastCards.innerHTML = '';
        for (let i = 0; i < data.list.length; i += 8) { // 8 * 3h = 24h
            const item = data.list[i];
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString(lang, { weekday: 'short' });
            forecastCards.innerHTML += `
                <div class="forecast-card">
                    <div class="forecast-day">${day}</div>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="">
                    <div class="forecast-temp">
                        ${Math.round(item.main.temp_min)}° / ${Math.round(item.main.temp_max)}°
                    </div>
                    <div class="small">${item.weather[0].description}</div>
                </div>
            `;
        }
        forecastCards.classList.remove('hidden');

        // Temperature chart (redesigned + color corrected)
        const theme = getChartTheme();

        const labels = data.list.map(item => formatShortDateLabel(item.dt, lang));
        const temps = data.list.map(item => item.main.temp);

        const ctx = chartCanvas.getContext('2d');
        chartCanvas.classList.remove('hidden');

        // gradient fill (soft premium glow under line)
        const gradient = ctx.createLinearGradient(0, 0, 0, chartCanvas.height || 260);
        gradient.addColorStop(0, theme.accent + '33');  // ~20% opacity
        gradient.addColorStop(1, theme.accent + '00');  // transparent

        if (window.tempChart) {
            window.tempChart.destroy();
        }

        window.tempChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temps,
                    borderColor: theme.accent,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.35,
                    borderWidth: 3,
                    pointRadius: 2,
                    pointHoverRadius: 5,
                    pointBackgroundColor: theme.accent,
                    pointBorderColor: theme.accent,
                    pointBorderWidth: 0,
                    hitRadius: 14
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // important if canvas is in a card
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 500
                },
                plugins: {
                    legend: {
                        display: false // section title already exists above
                    },
                    tooltip: {
                        backgroundColor: theme.tooltipBg,
                        titleColor: theme.tooltipText,
                        bodyColor: theme.tooltipText,
                        borderColor: theme.tooltipBorder,
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: (ctx) => ` ${ctx.parsed.y}°C`
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 8,
                        right: 8,
                        bottom: 0,
                        left: 4
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: theme.grid,
                            drawBorder: false,
                            tickLength: 0
                        },
                        ticks: {
                            color: theme.muted,
                            autoSkip: true,
                            maxTicksLimit: 8,
                            maxRotation: 25,
                            minRotation: 0,
                            padding: 8
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            color: (ctx) => {
                                // slightly stronger line at 0°
                                return ctx.tick && ctx.tick.value === 0 ? theme.gridStrong : theme.grid;
                            },
                            drawBorder: false
                        },
                        ticks: {
                            color: theme.muted,
                            padding: 8,
                            callback: (value) => `${value}°`
                        },
                        border: {
                            display: false
                        }
                    }
                }
            }
        });

        // Map
        mapDiv.innerHTML = '';                // clear old map if any
        mapDiv.classList.remove('hidden');

        // safety: if Leaflet didn't load, don't crash
        if (typeof L === 'undefined') {
            console.error('Leaflet (L) is not defined – check script tag.');
            mapDiv.innerHTML = '<p style="padding:0.5rem;font-size:0.85rem;">Map failed to load.</p>';
            return;
        }

        // Create map AFTER making container visible
        const map = L.map(mapDiv).setView(
            [data.city.coord.lat, data.city.coord.lon],
            10
        );

        const tiles = L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        );
        tiles.addTo(map);
        L.marker([data.city.coord.lat, data.city.coord.lon]).addTo(map);

        // Fix for cases when container size changes
        setTimeout(() => {
            map.invalidateSize();
        }, 0);
    }   // <--- closes function renderWeather
});    