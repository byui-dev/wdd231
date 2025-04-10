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

        const figure = document.createElement('figure');
        const photo = document.createElement('img');
        photo.classList.add("place-photo");
        photo.src = place.photo_url; // Use the URL from the data
        photo.alt = place.name;
        photo.onerror = () => {
            photo.src = "images/placeholder.png"; // Placeholder image in case of error
        };

        const title = document.createElement('h2');
        title.classList.add("place-title");
        title.innerText = place.name;

        const address = document.createElement('address');
        address.classList.add("place-address");
        address.innerText = place.address;

        const desc = document.createElement('p');
        desc.classList.add("place-description");
        desc.innerText = place.description;

        const button = document.createElement('button');
        button.classList.add("learn-more-btn");
        button.innerText = "Learn More";

        card.append(photo, title, address, desc, button); // Append all elements to the card
        showPlaces.appendChild(card); // Append the card to the container
    });
} // end function displayItems

displayItems(places); // Call the function to display items


