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

    // Example of using imageUrl property
    const member = { name: 'Example Member', imageUrl: 'https://example.com/logo.png' };
    const img = document.createElement('img');
    img.src = member.imageUrl; // This will now use the external URL
    img.alt = `${member.name} logo`;
    document.body.appendChild(img);
});