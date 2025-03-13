// Initialize navigation behavior
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default for # links
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
            }

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu after clicking a link
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        });
    });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
});