document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('saved-cities-grid');
    if (!grid) return;

    loadSavedCities();

    async function loadSavedCities() {
        setState('loading');

        try {
            const res = await fetch('/api/saved', {
                headers: { 'Accept': 'application/json' }
            });

            if (res.status === 401) {
                setState('unauthorized');
                return;
            }

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const cities = await res.json();

            if (!Array.isArray(cities) || cities.length === 0) {
                setState('empty');
                return;
            }

            renderCards(cities);
        } catch (err) {
            console.error('Failed to load saved cities:', err);
            setState('error', err.message);
        }
    }

    function setState(type, details = '') {
        if (!grid) return;

        let title = '';
        let text = '';

        switch (type) {
            case 'loading':
                title = 'Loading...';
                text = 'Fetching your saved cities';
                break;
            case 'empty':
                title = 'No saved cities';
                text = 'Save cities from the Home page and they will appear here.';
                break;
            case 'unauthorized':
                title = 'Login required';
                text = 'Please sign in to view saved cities.';
                break;
            case 'error':
            default:
                title = 'Something went wrong';
                text = details || 'Could not load saved cities.';
                break;
        }

        grid.innerHTML = `
            <div class="forecast-card" style="grid-column: 1 / -1; text-align:left; padding:1rem;">
                <div class="forecast-day" style="margin-bottom:.35rem;">${escapeHtml(title)}</div>
                <div class="small">${escapeHtml(text)}</div>
            </div>
        `;
    }

    function renderCards(cities) {
        grid.innerHTML = '';

        cities.forEach(city => {
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.style.textAlign = 'left';
            card.style.padding = '0.9rem';

            const displayName = city.country
                ? `${city.name}, ${city.country}`
                : city.name;

            card.innerHTML = `
                <div class="forecast-day" style="margin-bottom:.45rem;">${escapeHtml(displayName)}</div>
                <div class="small" style="margin-bottom:.75rem;">City ID: ${escapeHtml(String(city.city_id))}</div>

                <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
                    <a href="/city/${encodeURIComponent(city.city_id)}"
                       class="nav-link"
                       style="padding:.35rem .6rem; text-decoration:none;">
                        Open
                    </a>

                    <button class="icon-button remove-saved-btn"
                            type="button"
                            data-city-id="${city.city_id}"
                            title="Remove from saved"
                            style="width:auto; height:auto; border-radius:999px; padding:.35rem .65rem;">
                        Remove
                    </button>
                </div>
            `;

            grid.appendChild(card);
        });

        wireRemoveButtons();
    }

    function wireRemoveButtons() {
        const buttons = grid.querySelectorAll('.remove-saved-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const cityId = btn.dataset.cityId;
                if (!cityId) return;

                const originalText = btn.textContent;
                btn.disabled = true;
                btn.textContent = '...';

                try {
                    const res = await fetch(`/api/saved?city_id=${encodeURIComponent(cityId)}`, {
                        method: 'DELETE',
                        headers: { 'Accept': 'application/json' }
                    });

                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }

                    // reload list after removal
                    await loadSavedCities();
                } catch (err) {
                    console.error('Failed to remove saved city:', err);
                    btn.disabled = false;
                    btn.textContent = originalText;
                    alert('Failed to remove city. Please try again.');
                }
            });
        });
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});