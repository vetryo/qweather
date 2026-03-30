const GUEST_SAVED_KEY = 'qweather_guest_saved_cities';


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('saved-cities-grid');
    if (!grid) {
        return;
    }

    const mode = grid.dataset.mode === 'account' ? 'account' : 'guest';

    if (mode === 'account') {
        loadAccountCities(grid);
        return;
    }

    loadGuestCities(grid);
});


async function loadAccountCities(grid) {
    setState(grid, 'Loading saved cities', 'Fetching your account data...');

    try {
        const cities = await fetchSavedJson('/api/saved');

        if (!Array.isArray(cities) || cities.length === 0) {
            setState(grid, 'No saved cities yet', 'Save cities from the home page and they will appear here.');
            return;
        }

        renderAccountCards(grid, cities);
    } catch (error) {
        setState(grid, 'Could not load saved cities', error.message || 'Unexpected error while loading account data.');
    }
}


function renderAccountCards(grid, cities) {
    grid.innerHTML = '';

    cities.forEach((city) => {
        const card = document.createElement('article');
        card.className = 'saved-card';

        const title = [city.name, city.country].filter(Boolean).join(', ');
        const temp = Number.isFinite(Number(city.temp)) ? `${Math.round(Number(city.temp))}°` : 'Temp unavailable';
        const desc = city.description ? capitalize(city.description) : 'No description';
        const updated = city.last_updated ? `Updated ${formatDate(city.last_updated)}` : 'Update time unavailable';

        card.innerHTML = `
            <h3>${escapeHtml(title || 'Saved city')}</h3>
            <p>${escapeHtml(temp)} | ${escapeHtml(desc)}</p>
            <p>${escapeHtml(updated)}</p>
            <div class="saved-card-actions">
                <a href="/city/${encodeURIComponent(city.city_id)}" class="btn btn-secondary">Open</a>
                <button type="button" class="btn btn-ghost js-remove-account" data-city-id="${escapeHtml(String(city.city_id))}">Remove</button>
            </div>
        `;

        grid.appendChild(card);
    });

    grid.querySelectorAll('.js-remove-account').forEach((button) => {
        button.addEventListener('click', async () => {
            const cityId = button.dataset.cityId;
            if (!cityId) {
                return;
            }

            const original = button.textContent;
            button.disabled = true;
            button.textContent = 'Removing...';

            try {
                await fetchSavedJson(`/api/saved?city_id=${encodeURIComponent(cityId)}`, {
                    method: 'DELETE'
                });
                await loadAccountCities(grid);
            } catch (error) {
                button.disabled = false;
                button.textContent = original;
                alert(error.message || 'Failed to remove city.');
            }
        });
    });
}


function loadGuestCities(grid) {
    const cities = readGuestCities();

    if (!cities.length) {
        setState(grid, 'No local saved cities', 'Save cities from home to keep quick links in this browser.');
        return;
    }

    renderGuestCards(grid, cities);
}


function renderGuestCards(grid, cities) {
    grid.innerHTML = '';

    cities.forEach((city, index) => {
        const card = document.createElement('article');
        card.className = 'saved-card';

        const title = city.country ? `${city.name}, ${city.country}` : city.name;
        const temp = Number.isFinite(Number(city.temp)) ? `${Math.round(Number(city.temp))}°` : 'Temp unavailable';
        const desc = city.description ? capitalize(city.description) : 'No description';
        const date = city.savedAt ? `Saved ${formatDate(city.savedAt)}` : 'Saved locally';

        const openUrl = `/?lat=${encodeURIComponent(city.lat)}&lon=${encodeURIComponent(city.lon)}&name=${encodeURIComponent(city.name)}`;

        card.innerHTML = `
            <h3>${escapeHtml(title || 'Local city')}</h3>
            <p>${escapeHtml(temp)} | ${escapeHtml(desc)}</p>
            <p>${escapeHtml(date)}</p>
            <div class="saved-card-actions">
                <a href="${openUrl}" class="btn btn-secondary">Open</a>
                <button type="button" class="btn btn-ghost js-remove-guest" data-index="${index}">Remove</button>
            </div>
        `;

        grid.appendChild(card);
    });

    grid.querySelectorAll('.js-remove-guest').forEach((button) => {
        button.addEventListener('click', () => {
            const index = Number(button.dataset.index);
            if (!Number.isInteger(index) || index < 0) {
                return;
            }

            const cities = readGuestCities();
            cities.splice(index, 1);
            writeGuestCities(cities);
            loadGuestCities(grid);
        });
    });
}


function setState(grid, title, text) {
    grid.innerHTML = `
        <article class="saved-card saved-card-state">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(text)}</p>
        </article>
    `;
}


async function fetchSavedJson(url, options = {}) {
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


function readGuestCities() {
    try {
        const raw = localStorage.getItem(GUEST_SAVED_KEY);
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
        return [];
    }
}


function writeGuestCities(cities) {
    localStorage.setItem(GUEST_SAVED_KEY, JSON.stringify(cities));
}


function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'Unknown date';
    }

    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}


function capitalize(value) {
    if (!value) {
        return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
}


function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
