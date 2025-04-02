// Cross-browser compatible version of navigation.js
function initializeNavigation() {
    // Hamburger Menu Toggle
    var hamburger = document.getElementById("hamburger");
    var menuNav = document.getElementById("menuNav");

    if (hamburger && menuNav) {
        // Toggle menu
        hamburger.addEventListener("click", function () {
            var isExpanded = menuNav.classList.contains("hidden");
            menuNav.classList.toggle("hidden");

            // Update ARIA attributes
            hamburger.setAttribute("aria-expanded", isExpanded ? "true" : "false");

            // Add/remove open class for animation
            if (isExpanded) {
                hamburger.classList.add("open");
            } else {
                hamburger.classList.remove("open");
            }
        });

        // Close menu when clicking outside (fixed logic)
        document.addEventListener("click", function (event) {
            if (
                !menuNav.classList.contains("hidden") &&
                !menuNav.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {
                menuNav.classList.add("hidden");
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.classList.remove("open");
            }
        });

        // Add keyboard support
        hamburger.addEventListener("keydown", function (event) {
            // Enter or Space key
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                hamburger.click();
            }
        });
    }
}

// Add event listener with browser compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const menuNav = document.getElementById("menuNav");

    hamburger.addEventListener("click", () => {
        menuNav.classList.toggle("active");
    });
});