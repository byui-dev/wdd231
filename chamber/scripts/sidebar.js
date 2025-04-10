window.onload = function () {
    const sidebar = document.querySelector('#sidebarContent');

    // Get the current date
    const currentDate = new Date();

    // Get the last visit date from localStorage (if it exists)
    const lastVisit = localStorage.getItem('lastVisit');

    // If it's the first visit, show the welcome message
    if (!lastVisit) {
        sidebar.innerHTML = `<p>Welcome to the site! This is your first visit.</p>`;
        // Store the current date as the last visit date
        localStorage.setItem('lastVisit', currentDate.toString());
    } else {
        // Calculate the number of days since last visit
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysSinceLastVisit = Math.floor(timeDifference / (1000 * 3600 * 24));

        if (daysSinceLastVisit === 0) {
            // Less than a day since the last visit
            sidebar.innerHTML = `<p>Welcome back! You visited today.</p>`;
        } else if (daysSinceLastVisit === 1) {
            // One day since the last visit
            sidebar.innerHTML = `<p>Welcome back! You visited yesterday.</p>`;
        } else {
            // More than one day since the last visit
            sidebar.innerHTML = `<p>Welcome back! You visited ${daysSinceLastVisit} days ago.</p>`;
        }

        // Update the last visit date in localStorage
        localStorage.setItem('lastVisit', currentDate.toString());
    }
};   
