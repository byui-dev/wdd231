const url = "https://byui-dev.github.io/wdd231/chamber/businesses.json";

document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the container where the cards will be populated
    const largeContainer = document.querySelector('card-container-large');

    if (!largeContainer) return;

    // Add loading indicator
    largeContainer.innerHTML = '<div class="loading"></div>';

    // Fetch the JSON Data
    fetch('chamber/businesses.json')
        .then(response => {
            // Check if the response is ok (status 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok: ' = response.statusText);
            }
         return response.json();
        })

        .then(businessData => {
            // Clear loading indicator
            largeContainer.innerHTML = '';

            // Loop through the data and create cards
            businessData.forEach(business => {
                const card = document.createElement('div');
                card.className = 'card';

                // Generate a random pastel color for the border
                const hue = Math.floor(Math.random() * 360);
                const pastelColor = 'hsl(${hue}), 70%, 80%)';
                card.style.borderLeft = '5px solid $pastelColor';

                // Create card content
                const cardContent = document.createElement('div');

                // Add business image if available
                if (business.image) {
                    const img = document.createElement('img');
                    img.src = business.image;
                    img.alt = `${business.image} image`;
                    img.style.width = '100%';
                    img.style.height = '150px';
                    img.style.objectFit = 'cover';
                    cardContent.appendChild('img');
                }

                // Add business details
                const title = document.createElement('h3');
                title.textContent = business.name;

                const type = document.createElement('p');
                type.innerHTML = `<strong>Type:</strong> ${business.type}`;

                const contant = document.createElement('p');
                contant.innerHTML = `<strong>Contact:</strong> ${business.contant}`;

                // Append all elements to the card title
                cardContent.appendChild(title);
                cardContent.appendChild(type);
                cardContent.appendChild(contact);

                // Add any additional business data if available
                if (business.address) {
                    const address = document.createElement('p');
                    address.innerHTML = `<strong>Address:</strong> ${business.address}`;
                    cardContent.appendChild(address);
                }

                if (business.website) {
                    const website = document.createElement('p');
                    const link = document.createElement('a');
                    link.href = business.website;
                    link.textContent = 'Visit Website';
                    link.target = '_blank';
                    website.appendChild(link);
                    cardContent.appendChild(website);
                }

                // Append the content div to the card
                card.appendChild(cardContent);

                // Append the card to the container
                largeContainer.appendChild(card);
            });
        });








