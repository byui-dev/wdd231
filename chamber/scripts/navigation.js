document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger-menu');
  const nav = document.querySelector(".mainNav");

  hamburger.addEventListener('click', function () {
    nav.classList.toggle('show');
  });
});  