// navigation.js
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('myButton');
    const menuLinks = document.querySelector('.menuLinks');
    
    // Toggle menu when button is clicked
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('open');
        menuLinks.classList.toggle('open');
    });
    
    // Add current-menu-item class to the active page's menu item
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menuLinks li a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.parentElement.classList.add('current-menu-item');
        }
    });

 
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuButton.classList.contains('open')) {
        menuButton.classList.remove('open');
        menuLinks.classList.remove('open');
    }
});
