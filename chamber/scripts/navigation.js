document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            const nav = document.getElementById('menuNav');
            nav.classList.toggle('responsive');

            if (hamburger.parentElement) {
                hamburger.parentElement.classList.toggle('open');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const nav = document.getElementById('menuNav');

        if (nav.classList.contains('responsive') &&
            !nav.contains(event.target) &&
            !hamburger.contains(event.target)) {
            nav.classList.remove('responsive');

            if (hamburger.parentElement) {
                hamburger.parentElement.classList.remove('open');
            }
        }
    });
});
