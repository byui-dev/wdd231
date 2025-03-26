async function fetchBusinessCards() {
    try {
        const response = await fetch('businesses.json');
        const businesses = await response.json();
        const largeCardContainer = document.querySelector('.card-container-large');

        // Clear any existing cards
        largeCardContainer.innerHTML = '';

        businesses.forEach(business => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${business.logoUrl || 'placeholder.png'}" alt="${business.name || 'Business Logo'}">
                <div class="card-content">
                    <h3>${business.name || 'Unnamed Business'}</h3>
                    <p><strong>Address:</strong> ${business.address || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${business.phoneNumber || 'N/A'}</p>
                    <p><strong>Website:</strong> <a href="${business.websiteUrl || '#'}" target="_blank">${business.websiteUrl || 'No Website'}</a></p>
                    <p><strong>Membership:</strong> ${getMembershipLevel(business.membershipLevel)}</p>
                    ${business.additionalInfo ? `<p>${business.additionalInfo}</p>` : ''}
                </div> 
            `;
            largeCardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching business data:', error);
        const largeCardContainer = document.querySelector('.card-container-large');
        largeCardContainer.innerHTML = `
            <div class="error-card">
                <p>Unable to load business data. Please try again later.</p>
            </div>
        `;           
    }
}

// Helper function to convert membership level to text
function getMembershipLevel(level) {
    const levels = {
        1: 'Basic Member',
        2: 'Silver Member',
        3: 'Gold Member'
    };
    return levels[level] || 'Not a Member';
}

// View toggle functionality
function setupViewToggle() {
    const gridViewBtn = document.getElementById('grid-view-button');
    const listViewBtn = document.getElementById('list-view-button');
    const largeCardContainer = document.querySelector('.card-container-large');

    gridViewBtn.addEventListener('click', () => {
        largeCardContainer.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', () => {
        largeCardContainer.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');       
    });
}

// Initialize business directory
document.addEventListener('DOMContentLoaded', () => {
    fetchBusinessCards();
    setupViewToggle();
});