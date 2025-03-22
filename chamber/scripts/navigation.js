// navigation.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('menuNav');

    if (hamburger && nav) { // Check if elements exist
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    } else {
      console.error("Hamburger or navigation menu element not found.");
    }

});