import { gameReserves } from "../data/gameReserves.mjs";

const container = document.getElementById('reserves-container');
const filterSelect = document.getElementById('location-filter');

// Render function
function renderReserves(reserves) {
    container.innerHTML = '';

    reserves.forEach(reserve => {
        const card = document.createElement('div');
        card.className = 'reserve-card';

        card.innerHTML = ` 
    <img src="images/${reserve.image}" alt="${reserve.name}">
    <h2>${reserve.name}</h2>
    <p><strong>Location:</strong> ${reserve.location}</p>
    <p><strong>Accomodation:</strong> ${reserve.bookingFees.accomodation}</p>
    <p><strong>Day Visit:</strong> ${reserve.bookingFees.dayVisit}</p>
    <ul>
      ${reserve.extraServices.map(service => `<li>${service}</li>`).join('')}
    </ul>  
   `;

        container.appendChild(card);
    });
}

const priceInput = document.getElementById('price-filter');

priceInput.addEventListener('input', () => {
    const maxPrice = parseFloat(priceInput.value);
    const selectedLocation = filterSelect.value;

    let filteredReserves = gameReserves;

    if (!isNaN(maxPrice)) {
        filteredReserves = filteredReserves.filter(reserve =>
            reserve.bookingFees.accommodation <= maxPrice ||
            reserve.bookingFees.dayVisit <= maxPrice
        );
    }

    if (selectedLocation !== 'all') {
        filteredReserves = fi
        filteredReserves.filter(reserve =>
            reserve.location.includes(selectedLocation)
        );
    }

    // Initial render
    renderReserves(gameReserves);
});