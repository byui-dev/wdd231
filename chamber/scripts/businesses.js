class BusinessDirectory {
    constructor() {
        // Select the container div upfront
        this.container = document.querySelector('.card-container-large');
        
        // Throw an error if container is not found
        if (!this.container) {
            throw new Error('Card container not found in the HTML. Please ensure the div with class "card-container-large" exists.');
        }

        this.businesses = [];
        this.currentView = 'grid';
        
        // Bind methods to ensure correct context
        this.fetchBusinesses = this.fetchBusinesses.bind(this);
        this.renderBusinesses = this.renderBusinesses.bind(this);
        
        // Initialize event listeners
        this.initializeEventListeners();
    }

    // Fetch businesses from JSON data source
    async fetchBusinesses() {
        try {
            const response = await fetch('data/members.json');
            
            // Check if response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.businesses = data;
            return this.businesses;
        } catch (error) {
            console.error('Error fetching businesses:', error);
            // Optionally, display an error message to the user
            this.container.innerHTML = `
                <div class="error-message">
                    <p>Unable to load businesses. Please try again later.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
            return [];
        }
    }

    // Create grid view card
    createGridCard(business) {
        const card = document.createElement('div');
        card.classList.add('business-card', 'grid-view');
        card.innerHTML = `
            <div class="card-image">
                <img src="${business.imageUrl}" alt="${business.name} logo" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${business.name}</h3>
                <p class="business-type">${business.type}</p>
                <div class="business-details">
                    <p><strong>Address:</strong> ${business.address}</p>
                    <p><strong>Phone:</strong> ${business.phone}</p>
                    <p><strong>Website:</strong> <a href="${business.website}" target="_blank">${business.website}</a></p>
                    ${business.membershipLevel ? `<p><strong>Membership Level:</strong> ${business.membershipLevel}</p>` : ''}
                </div>
            </div>
        `;
        return card;
    }

    // Create list view card
    createListCard(business) {
        const card = document.createElement('div');
        card.classList.add('business-card', 'list-view');
        card.innerHTML = `
            <div class="card-image">
                <img src="${business.imageUrl}" alt="${business.name} logo" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${business.name}</h3>
                <p class="business-type">${business.type}</p>
                <div class="business-details">
                    <p><strong>Address:</strong> ${business.address}</p>
                    <p><strong>Phone:</strong> ${business.phone}</p>
                    <p><strong>Website:</strong> <a href="${business.website}" target="_blank">${business.website}</a></p>
                    ${business.membershipLevel ? `<p><strong>Membership Level:</strong> ${business.membershipLevel}</p>` : ''}
                </div>
            </div>
        `;
        return card;
    }

    // Render businesses in specified view
    async renderBusinesses(view = 'grid') {
        // Ensure businesses are loaded
        if (this.businesses.length === 0) {
            await this.fetchBusinesses();
        }
        
        // Clear previous content
        this.container.innerHTML = '';
        
        // Set view class
        this.container.classList.remove('grid-view', 'list-view');
        this.container.classList.add(`${view}-view`);
        
        // Create cards based on view
        this.businesses.forEach(business => {
            const card = view === 'grid' 
                ? this.createGridCard(business)
                : this.createListCard(business);
            this.container.appendChild(card);
        });

        this.currentView = view;
    }

    // Initialize event listeners
    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const gridButton = document.getElementById('grid');
            const listButton = document.getElementById('list');
            
            if (gridButton && listButton) {
                gridButton.addEventListener('click', () => this.renderBusinesses('grid'));
                listButton.addEventListener('click', () => this.renderBusinesses('list'));
                
                // Initial render
                this.renderBusinesses('grid');
            } else {
                console.error('Grid or list buttons not found in the HTML');
            }
        });
    }

    // Optional: Filter businesses by type
    filterBusinessesByType(type) {
        return this.businesses.filter(business => 
            business.type.toLowerCase().includes(type.toLowerCase())
        );
    }

    // Optional: Sort businesses by membership level
    sortBusinessesByMembershipLevel(ascending = true) {
        return this.businesses.sort((a, b) => 
            ascending 
                ? (a.membershipLevel - b.membershipLevel)
                : (b.membershipLevel - a.membershipLevel)
        );
    }
}

// Initialize the business directory
const businessDirectory = new BusinessDirectory();