// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const menuNav = document.getElementById("menuNav");

    if (hamburger && menuNav) {
        hamburger.addEventListener("click", () => {
            menuNav.classList.toggle("active");
        });

        document.addEventListener("click", (event) => {
            if (
                menuNav.classList.contains("active") &&
                !menuNav.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {
                menuNav.classList.remove("active");
            }
        });
    }
});
// ...existing code...
