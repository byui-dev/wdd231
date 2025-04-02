// Cross-browser compatible version of date.js
function initializeDateElements() {
    try {
        var yearSpan = document.getElementById('year');
        var lastModifiedParagraph = document.getElementById('lastModified');

        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        if (lastModifiedParagraph) {
            lastModifiedParagraph.textContent = 'Last Modified: ' + document.lastModified;
        }
    } catch (error) {
        console.error('Error updating date information:', error);
    }
}

// Add event listener with browser compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDateElements);
} else {
    initializeDateElements();
}