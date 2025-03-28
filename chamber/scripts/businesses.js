document.addEventListener('DOMContentLoaded', () => {
    const businessDirectory = new BusinessDirectory();
    businessDirectory.init();
});

class BusinessDirectory {
    constructor() {
        this.gridButton = document.querySelector('#grid');
        this.listButton = document.querySelector('#list');
        this.displayArea = document.querySelector('article.grid');
        this.businesses = [];
    }

    init() {
        this.setupViewTogglers();
        this.fetchBusinessCards();
    }

    setupViewTogglers() {
        if (!this.gridButton || !this.listButton || !this.displayArea) {
            console.warn('View toggle elements not found');
            return;
        }

        this.gridButton.addEventListener("click", () => this.toggleView('grid'));
        this.listButton.addEventListener("click", () => this.toggleView('list'));
    }

    toggleView(viewType) {

        this.displayArea.className = `grid ${viewType}`;
    }

    async fetchBusinessCards() {
        try {

            const response = await fetch('members.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.businesses = await response.json();

            this.validateAndRenderBusinesses();
        } catch (error) {
            this.handleFetchError(error);
        }
    }

    validateAndRenderBusinesses() {
        if (!Array.isArray(this.businesses) || this.businesses.length === 0) {
            this.displayError('No business data found');
            return;
        }

        this.displayArea.innerHTML = '';

        const validBusinesses = this.businesses.filter(this.validateBusinessData);

        validBusinesses.forEach(business => {
            const gridCard = this.createBusinessCard(business);
            this.displayArea.appendChild(gridCard);
        });
    }

    validateBusinessData(business) {
        const requiredFields = ['name', 'address', 'contact', 'website', 'image', 'type'];
        const isValid = requiredFields.every(field =>
            business[field] && business[field].trim() !== ''
        );

        if (!isValid) {
            console.warn(`Invalid business data:`, business);
        }

        return isValid;
    }

    createBusinessCard(business) {
        const card = document.createElement('div');
        card.className = "business-card";
        card.innerHTML = `
            <img src="${this.sanitizeURL(business.image)}" alt="${this.sanitizeText(business.name)} logo">
            <h3>${this.sanitizeText(business.name)}</h3>
            <p class="business-type">${this.sanitizeText(business.type)}</p>
            <p class="business-address">${this.sanitizeText(business.address)}</p>
            <p class="business-contact">${this.sanitizeText(business.contact)}</p>
            <a href="${this.sanitizeURL(business.website)}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;
        return card;
    }

    sanitizeText(text) {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = text;
        return tempDiv.innerHTML;
    }

    sanitizeURL(url) {
        try {
            return new URL(url).toString();
        } catch {
            console.warn(`Invalid URL: ${url}`);
            return '#';
        }
    }

    handleFetchError(error) {
        console.error('Error fetching business data:', error);
        this.displayError('Unable to load business directory. Please try again later.');
    }

    displayError(message) {
        this.displayArea.innerHTML = `
            <div class="error-message">
                <p>${this.sanitizeText(message)}</p>
            </div>
        `;
    }
}
