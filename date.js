// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    try {

        // Set current year
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Set last modified date
        const lastModifiedElement = document.getElementById('lastModified');
        if (lastModifiedElement) {
            lastModifiedElement.textContent = `Last Updated: ${document.lastModified}`;
        }
    } catch (error) {
        console.error('Page initialization error:', error);
    }
});