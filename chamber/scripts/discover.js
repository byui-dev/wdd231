import { places } from '../data/places.mjs'; // Import the places data

const showPlaces = document.querySelector("#myplaces"); // Reference to the div where the cards will be displayed   

function displayItems(places) {
    if (!Array.isArray(places)) {
        console.error("Expected an array of places");
        return;
    }

    showPlaces.innerHTML = ''; // Clear any existing cards

    places.forEach(place => {
        const card = document.createElement('div');
        card.classList.add("card");

        const photo = document.createElement('img');
        photo.classList.add("place-photo");
        photo.src = place.photo_url; // Use the URL from the data
        photo.alt = place.name;
        photo.onerror = () => {
            photo.src = "images/placeholder.png"; // Placeholder image in case of error
        }

        const title = document.createElement('h2');
        title.classList.add("place-title");
        title.innerText = place.name;

        const address = document.createElement('address');
        title.classList.add("place-address");
        title.innerText = place.address;

        const cost = document.createElement('p');
        title.classList.add("place-cost");
        title.innerText = place.cost;

        const desc = document.createElement('p');
        title.classList.add("place-description");
        title.innerText = place.description;

        card.append(photo, title, address, cost, desc); // Append all elements to the card
        showPlaces.appendChild(card); // Append the card to the container
    });
} // end function displayItems

displayItems(places); // Call the function to display items


