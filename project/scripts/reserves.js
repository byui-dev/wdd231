import { gameReserves } from "../data/gameReserves.mjs";

const container = document.getElementById('reserves-container');
const filterSelect = document.getElementById('location-filter');
const priceInput = document.getElementById('price-filter');
const viewToggle = document.getElementById('view-toggle');

let currentView = 'grid';

// Apply all filters and render
function applyFilters() {
    const selectedLocation = filterSelect.value;
    const maxPrice = parseFloat(priceInput.value);

    let filteredReserves = gameReserves;

    // Filter by location
    if (selectedLocation !== 'all') {
        filteredReserves = filteredReserves.filter(reserve =>
            reserve.location === selectedLocation
        );
    }

    // Filter by price
    if (!isNaN(maxPrice)) {
        filteredReserves = filteredReserves.filter(reserve =>
            reserve.bookingFees.accommodation <= maxPrice ||
            reserve.bookingFees.dayVisit <= maxPrice
        );
    }

    renderReserves(filteredReserves);
}

// Toggle between grid and list views
function toggleView() {
    if (currentView === 'grid') {
        currentView = 'list';
        container.classList.remove('grid');
        container.classList.add('list');
        viewToggle.textContent = '📊 Grid View';
    } else {
        currentView = 'grid';
        container.classList.remove('list');
        container.classList.add('grid');
        viewToggle.textContent = '📋 List View';
    }

    applyFilters(); // Refresh view
}

// Render reserves based on current view
function renderReserves(reserves) {
    container.innerHTML = '';

    if (reserves.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No game reserves match your filters. Please try different criteria.';
        container.appendChild(noResults);
        return;
    }

    reserves.forEach(reserve => {
        const card = document.createElement('div');
        card.className = currentView === 'grid' ? 'reserve-card' : 'reserve-card-list-view';

        if (currentView === 'grid') {
            card.innerHTML = `
                <img src="images/${reserve.image}" alt="${reserve.name}" loading="lazy">
                <h2>${reserve.name}</h2>
                <p><strong>Location:</strong> ${reserve.location}</p>
                <p><strong>Accommodation:</strong> R${reserve.bookingFees.accommodation}</p>
                <p><strong>Day Visit:</strong> R${reserve.bookingFees.dayVisit}</p>
                <div class="services">
                    <h3>Extra Services:</h3>
                    <ul>
                        ${reserve.extraServices.map(service => `<li>${service}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="list-image">
                    <img src="images/${reserve.image}" alt="${reserve.name}" loading="lazy">
                </div>
                <div class="list-content">
                    <h2>${reserve.name}</h2>
                    <p><strong>Location:</strong> ${reserve.location}</p>
                    <p><strong>Accommodation:</strong> R${reserve.bookingFees.accommodation}</p>
                    <p><strong>Day Visit:</strong> R${reserve.bookingFees.dayVisit}</p>
                    <p><strong>Services:</strong> ${reserve.extraServices.join(', ')}</p>
                </div>
            `;
        }

        container.appendChild(card);
    });
}

// Event listeners
filterSelect.addEventListener('change', applyFilters);
priceInput.addEventListener('input', applyFilters);
viewToggle.addEventListener('click', toggleView);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    container.classList.add(currentView);
    renderReserves(gameReserves);
});
