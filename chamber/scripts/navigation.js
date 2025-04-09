document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".mainNav");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        nav.classList.toggle("active");
    });
});