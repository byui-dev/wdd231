document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const menuNav = document.getElementById("menuNav");

    hamburger.addEventListener("click", () => {
        menuNav.classList.toggle("hidden");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (
            menuNav.classList.contains("hidden") &&
            !menuNav.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            menuNav.classList.remove("hidden");
        }
    });

    // Grid/List Toggle
    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");
    const cardsContainer = document.getElementById("cards-container");

    gridButton.addEventListener("click", () => {
        cardsContainer.classList.add("grid");
        cardsContainer.classList.remove("list");
        gridButton.classList.add("active");
        listButton.classList.remove("active");
    });

    listButton.addEventListener("click", () => {
        cardsContainer.classList.add("list");
        cardsContainer.classList.remove("grid");
        listButton.classList.add("active");
        gridButton.classList.remove("active");
    });
});
