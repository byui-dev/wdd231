function displayError(message) {
    const container = document.getElementById('cards-container');
    const loadingElement = document.getElementById('loading');

    if (loadingElement) loadingElement.remove();

    if (container) {
        let existingError = container.querySelector('.error-message');
        if (!existingError) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error';
            errorElement.textContent = message || 'An error occurred while loading the business directory.';
            container.appendChild(errorElement);
        } else {
            existingError.textContent = message;
        }
    }
}

function createCardsFromJSON() {
    const loadingElement = document.getElementById('loading');

    fetch('data/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.members || !Array.isArray(data.members)) {
                throw new Error('Invalid data format');
            }

            const members = data.members;
            const cardsContainer = document.getElementById('cards-container');

            if (!cardsContainer) {
                throw new Error('Cards container not found');
            }

            if (loadingElement) {
                loadingElement.remove();
            }

            const fragment = document.createDocumentFragment();

            members.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';

                const name = document.createElement('h3');
                name.textContent = item.name;

                const address = document.createElement('p');
                address.textContent = `Address: ${item.address}`;

                const phone = document.createElement('p');
                phone.textContent = `Phone: ${item.phone}`;

                const website = document.createElement('a');
                website.href = item.website;
                website.textContent = 'website';
                website.target = '_blank';
                website.rel = 'noopener';

                const membership = document.createElement('p');
                let membershipLevel = '';
                switch (item.membership) {
                    case '3':
                        membershipLevel = 'Gold Member';
                        break;
                    case '2':
                        membershipLevel = 'Silver Member';
                        break;
                    case '1':
                        membershipLevel = 'Bronze Member';
                        break;
                    default:
                        membershipLevel = 'Member';
                }
                membership.textContent = `Membership: ${membershipLevel}`;