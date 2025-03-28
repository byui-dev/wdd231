document.addEventListener('DOMContentLoaded', () => {
    fetchBusinessCards();

    const gridButton = document.querySelector('#grid');
    const listButton = document.querySelector('#list');
    const displayArea = document.querySelector('article.grid');

    if (gridButton && listButton && displayArea) {
        gridButton.addEventListener("click", () => {
            displayArea.classList.remove('list');
            displayArea.classList.add('grid');
        });

        listButton.addEventListener("click", () => {
            displayArea.classList.remove('grid');
            displayArea.classList.add('list');
        });
    }
});

// Function to fetch business data
async function fetchBusinessCards() {
    try {
        const response = await fetch('businesses.json');

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const businesses = await response.json();
        const displayArea = document.querySelector('article.grid');
        
        if (!Array.isArray(businesses) || businesses.length === 0) throw new Error('No business data found');
        
        displayArea.innerHTML = '';

        businesses.forEach(business => {
            if (!validateBusinessData(business)) return;

            const gridCard = createBusinessCard(business);
            displayArea.appendChild(gridCard);
        });

    } catch (error) {
        console.error('Error fetching business data:', error);
    }
}

// Validate business object
function validateBusinessData(business) {
    return ['name', 'address', 'contact', 'website', 'image'].every(field => business[field]);
}

// Create business card element
function createBusinessCard(business) {
    const card = document.createElement('div');
    card.className = "business-card";
    card.innerHTML = `
        <img src="${business.image}" alt="${business.name} logo">
        <h3>${business.name}</h3>
        <p>${business.address}</p>
        <p>${business.contact}</p>
        <a href="${business.website}" target="_blank">Visit Website</a>
    `;
    return card;
}
