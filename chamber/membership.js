// scripts/membership.js
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('modal-container');

    try {
        const response = await fetch('data/membershipLevels.json');
        const data = await response.json();

        data.levels.forEach(level => {
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
        console.error('Error loading membership data:', error);
        if (container) {
            container.innerHTML = '<p class="error-message">Failed to load membership information.</p>';
        }
    }
});