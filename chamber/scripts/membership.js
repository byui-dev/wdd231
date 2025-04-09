// scripts/membership.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('modal-container');

    // Directly embed the JSON data
    const membershipData = {
        "levels": [
            {
                "name": "NP Membership",
                "price": "Free",
                "benefits": [
                    "Listing in the online directory",
                    "Access to member-only events (at a cost)"
                ]
            },
            {
                "name": "Bronze Membership",
                "price": "R 500 per year",
                "benefits": [
                    "Enhanced listing in the online directory",
                    "Discounted rates for events and workshops",
                    "Networking opportunities"
                ]
            },
            {
                "name": "Silver Membership",
                "price": "R 1200 per year",
                "benefits": [
                    "Premium listing in the online directory",
                    "Significant discounts for events and workshops",
                    "Featured in one newsletter per year",
                    "Access to exclusive business resources",
                    "Networking opportunities"
                ]
            },
            {
                "name": "Gold Membership",
                "price": "R 2500 per year",
                "benefits": [
                    "Top-tier listing in the online directory",
                    "Free admission to all chamber events",
                    "Featured in two newsletters per year",
                    "Priority access to business consulting services",
                    "Sponsorship opportunities for select events",
                    "Extensive networking opportunities"
                ]
            }
        ]
    };

    try {
        membershipData.levels.forEach(level => {
            const dialog = document.createElement('dialog');
            dialog.classList.add('modal-box');
            dialog.setAttribute('aria-labelledby', `membership-title-${level.name.replace(/\s+/g, '-').toLowerCase()}`);

            const titleId = `membership-title-${level.name.replace(/\s+/g, '-').toLowerCase()}`;

            const benefitsList = level.benefits.map(benefit => `<li>${benefit}</li>`).join('');

            dialog.innerHTML = `
                <h3 id="${titleId}">${level.name}</h3>
                <div class="modal-content hidden">
                    <p>Price: ${level.price}</p>
                    <h4>Benefits:</h4>
                    <ul>${benefitsList}</ul>
                </div>
                <button class="toggle-btn" aria-expanded="false" aria-controls="${titleId}-content">Show More</button>
            `;

            container.appendChild(dialog);
        });

        container.addEventListener('click', (event) => {
            if (event.target.classList.contains('toggle-btn')) {
                const button = event.target;
                const modal = button.closest('.modal-box');
                const content = modal.querySelector('.modal-content');
                const expanded = button.getAttribute('aria-expanded') === 'true' || false;

                content.classList.toggle('hidden');
                button.setAttribute('aria-expanded', !expanded);
                button.textContent = !expanded ? 'Show Less' : 'Show More';
            }
        });

    } catch (error) {
        console.error('Error processing membership data:', error);
        if (container) {
            container.innerHTML = '<p class="error-message">Failed to load membership information.</p>';
        }
    }
});