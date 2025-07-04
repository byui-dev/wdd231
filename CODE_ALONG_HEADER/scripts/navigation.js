// Store the selected items that we are going to use
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

// Toggle the show class on and off
navbutton.addEventListener('click', () => {
  navbutton.classList.toggle('show');
  navlinks.classList.toggle('show');
});

