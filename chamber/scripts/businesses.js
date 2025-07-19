// Cross-browser compatible version of businesses.js
function createCardsFromJSON() {
    var loadingElement = document.getElementById('loading');

    // Use fetch with a polyfill for older browsers
    fetch('data/members.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ' + response.status);
            }
            return response.text();
        })
        .then(function (text) {
            try {
                var data = JSON.parse(text);
                if (!data || !data.members || !Array.isArray(data.members)) {
                    throw new Error("Expected an array of members in the JSON response.");
                }

                var members = data.members;
                var cardsContainer = document.getElementById('cards-container');

                if (!cardsContainer) {
                    throw new Error('Element with ID "cards-container" not found');
                }

                // Remove loading indicator
                if (loadingElement) {
                    loadingElement.remove();
                }

                members.forEach(function (item) {
                    var card = document.createElement('div');
                    card.className = 'card'; // Match CSS class name

                    var name = document.createElement('h3'); // Change to h3 for proper hierarchy
                    name.textContent = item.name;

                    var address = document.createElement('p');
                    address.textContent = 'Address: ' + item.address;

                    var phone = document.createElement('p');
                    phone.textContent = 'Phone: ' + item.phone;

                    var website = document.createElement('a');
                    website.href = item.website;
                    website.textContent = 'Website';
                    website.target = "_blank";
                    website.rel = "noopener"; // Security best practice

                    var membership = document.createElement('p');
                    var membershipLevel = '';
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
                    membership.textContent = 'Membership: ' + membershipLevel;

                    var image = document.createElement('img');
                    image.src = item.image;
                    image.alt = item.name + ' logo';
                    image.className = 'card-image';

                    card.appendChild(image);
                    card.appendChild(name);
                    card.appendChild(address);
                    card.appendChild(phone);
                    card.appendChild(website);
                    card.appendChild(membership);

                    cardsContainer.appendChild(card);
                });
            } catch (error) {
                displayError('Error processing business data: ' + error.message);
                console.error('JSON parsing error:', error);
            }
        })
        .catch(function (error) {
            displayError('Could not load business directory. Please try again later.');
            console.error('Error fetching or displaying JSON:', error);
        });
}

function displayError(message) {
    var container = document.getElementById('cards-container');
    var loadingElement = document.getElementById('loading');

    if (loadingElement) {
        loadingElement.remove();
    }

    if (container) {
        var errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message || 'An error occurred loading the business directory.';
        container.appendChild(errorElement);
    }
}

// Add event listener with browser compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDirectory);
} else {
    initializeDirectory();
}

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}
