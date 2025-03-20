// For navigation.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menuNav = document.getElementById('menuNav');
    
    hamburger.addEventListener('click', function() {
      menuNav.classList.toggle('open');
    });
  });