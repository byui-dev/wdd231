async function createCardsFromJSON() {
    try {
        const response = await fetch('data/members.json');

        // To check if the response is okay before parsing
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Read and log raw response
        const text = await response.text();
        console.log("Raw JSON Response:", text); // Debugging

        const data = JSON.parse(text); // Parse JSON
        console.log("Parsed JSON Data:", data); // Debugging
        if (!data || !data.members || !Array.isArray(data.members)) {
            throw new Error("Expected an array of members in the JSON response.");
        }

        const members = data.members;

        // Ensure the container exists
        const cardsContainer = document.querySelector('#cards-container'); // Updated selector
        if (!cardsContainer) {
            throw new Error('Element with ID "cards-container" not found');
        }

        members.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('business-card'); // Updated to match CSS

            const name = document.createElement('h2');
            name.textContent = item.name;

            const address = document.createElement('p');
            address.textContent = `Address: ${item.address}`;

            const phone = document.createElement('p');
            phone.textContent = `Phone: ${item.phone}`;

            const website = document.createElement('a');
            website.href = item.website;
            website.textContent = 'Website';
            website.target = "_blank";

            const membership = document.createElement('p');
            let membershipLevel = '';
            switch (item.membership) {
                case 1:
                    membershipLevel = 'Member';
                    break;
                case 2:
                    membershipLevel = 'Silver';
                    break;
                case 3:
                    membershipLevel = 'Gold';
                    break;
                default:
                    membershipLevel = "Unknown Membership Level";
            }
            membership.textContent = `Membership: ${membershipLevel}`;

            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.name;
            image.classList.add('card-image');

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(website);
            card.appendChild(membership);


            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching or displaying JSON:', error);
    }
}

// Add toggle functionality for Grid and List views
document.addEventListener('DOMContentLoaded', () => {
    const gridButton = document.querySelector('#grid');
    const listButton = document.querySelector('#list');
    const article = document.querySelector('article'); // Ensure this matches the HTML structure

    if (gridButton && listButton && article) {
        gridButton.addEventListener('click', () => {
            article.classList.remove('list-view'); // Ensure this matches CSS
            article.classList.add('grid-view');
        });

        listButton.addEventListener('click', () => {
            article.classList.remove('grid-view');
            article.classList.add('list-view');
        });
    } else {
        console.error('Grid/List buttons or article element not found.');
    }
});

createCardsFromJSON();