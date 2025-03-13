// Update the copyright year and last modified date
function updateDateInformation() {
    // Set the current year for copyright
    const yearElement = document.getElementById('year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
    
    // Set the last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        lastModifiedElement.textContent = `Last Updated: ${lastModified}`;
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateDateInformation();
});