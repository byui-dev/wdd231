const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true, description: 'This course introduces students to programming concepts.', technology: ['Python'] },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true, description: 'Learn the basics of web development.', technology: ['HTML', 'CSS'] },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true, description: 'Learn to write and use functions efficiently.', technology: ['Python'] },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true, description: 'Introduction to object-oriented programming.', technology: ['C#'] },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true, description: 'Develop dynamic websites with JavaScript.', technology: ['HTML', 'CSS', 'JavaScript'] },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false, description: 'Advanced front-end web development.', technology: ['HTML', 'CSS', 'JavaScript'] }
];

/**
 * Displays the provided courses in the DOM
 * @param {Array} filteredCourses - Array of course objects to display
 */
function displayCourses(filteredCourses) {
    const container = document.getElementById('courses');
    const totalCreditsDiv = document.getElementById('totalCredits');

    // Clear previous content
    container.innerHTML = '';

    let totalCredits = 0;

    filteredCourses.forEach(course => {
        totalCredits += course.credits;
        const courseDiv = document.createElement('div');

        // Assign class based on completion status
        courseDiv.className = `course ${course.subject.toLowerCase()} ${course.completed ? 'completed' : 'not-completed'}`;

        // Display subject and number together
        courseDiv.textContent = `${course.subject} ${course.number}`;

        // Add click event for details
        courseDiv.onclick = () => showDetails(course);

        container.appendChild(courseDiv);
    });

    // Update total credits display
    totalCreditsDiv.textContent = `The total credits for course listed above is ${totalCredits}`;
}

/**
 * Filters courses based on the selected category
 * @param {string} category - Filter category ('all', 'CSE', or 'WDD')
 */
function filterCourses(category) {
    const detailsContainer = document.getElementById('courseDetails');
    detailsContainer.innerHTML = '';

    let filtered = courses;

    if (category !== 'all') {
        filtered = courses.filter(course => course.subject === category);
    }

    displayCourses(filtered);
}

/**
 * Shows detailed information for a selected course
 * @param {Object} course - The course object to display details for
 */
function showDetails(course) {
    const detailsContainer = document.getElementById('courseDetails');
    detailsContainer.innerHTML = `
        <h3>${course.subject} ${course.number}: ${course.title}</h3>
        <p>${course.description}</p>
        <p>Credits: ${course.credits}</p>
        <p>Status: ${course.completed ? 'Completed' : 'Not Completed'}</p>
        <p>Technologies: ${course.technology.join(', ')}</p>
    `;
}

// Initialize course display when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    filterCourses('all');
});