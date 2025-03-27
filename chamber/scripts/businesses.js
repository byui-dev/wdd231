// Function to fetch and populate business cards
async function fetchBusinessCards() {
    try {
        const response = await fetch('businesses.json');
        const businesses = await response.json();
        
        // Select card containers
        const largeCardContainer = document.querySelector('card-container-large');
        const smallCardContainer = document.querySelector('card-container-small');

        // Clear existing cards
        largeCardContainer.innerHTML = '';
        smallCardContainer.innerHTML = '';

        businesses.forEach(business => {
            // Create large card
            const largeCard = document.createElement('div');
            largeCard.className = 'card large-card';
            largeCard.innerHTML = `
                <div class="card-image">
                     <img src="${business.image}" alt="${business.name} logo" loading="lazy">
                </div>
                <div class="card-content">     
                     <h3>${business.name}</h3>
                     <p><strong>Business type:</strong> ${business.type}</p>
                     <p><strong>Address:</strong> ${business.address}</p>
                     <p><strong>Contact:</strong> ${business.contact}</p>
                     <p><strong>Website:</strong>
                          <a href="${business.website}" target="_blank" rel="noopener noreferrer"> 
                              ${business.website.replace('https://', '')}
                          </a>
                     </p>
                </div>                   
            `;
            largeCardContainer.appendChild(largeCard);

            // Create small card
            const smallCard = document.createElement('div');
            smallCard.className = "card small-card";
            smallCard.innerHTML = `
                 <h3>${business.name}</h3>
                 <p>${business.type}</p>
                 <p>${business.contact}</p>
            `; 
            smallCardContainer.appendChild(smallCard);
        });
    } catch (error) {
        console.error('Error fetching business data:', error);
        document.querySelector('card-container-large').innerHTML = `
            <div class='error-card'>
                <p>Unable to load business data. Please try again later.</p>
                <p>error: ${error.message}</p>
            </div>    
        `;
    }    
}

// View toggle functionality































