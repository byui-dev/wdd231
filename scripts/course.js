const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming fundamentals such as variables, loops, and input/output.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course covers the basics of web design and development with HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces object-oriented programming concepts like encapsulation and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Function to create course cards
function createCourseCards(courseList) {
    const courseContainer = document.getElementById('courseContainers');

    if (!courseContainer) {
        console.error('Card container not found');
        return;
    }

    // Clear existing cards
    courseContainer.innerHTML = '';

    if (!courseList || courseList.length === 0) {
        courseContainer.innerHTML = `<p>No courses found. Please try another filter.</p>`;
        return;
    }

    // Loop through each course and create cards with animation delay
    courseList.forEach((course, index) => {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        // Add animation delay based on index
        card.style.animationDelay = `${index * 0.1}s`;

        // Add a class to indicate completion status for styling
        if (course.completed) {
            card.classList.add('completed');
        } else {
            card.classList.add('in-progress');
        }

        card.innerHTML = `
        <div class="course-info">
             <h3>${course.title || 'Unknown course'}</h3>
             <p><strong>Subject:</strong> ${course.subject || 'Not Specified'}</p>
             <p><strong>Number:</strong> ${course.number || 'Not Specified'}</p>
             <p><strong>Credits:</strong> ${course.credits || 'Not Specified'}</p>
             <p><strong>Certificate:</strong> ${course.certificate || 'Not Specified'}</p>
             <p><strong>Description:</strong> ${course.description || 'Description unavailable'}</p>
             <p><strong>Technology:</strong> ${course.technology ? course.technology.join(', ') : 'Not Specified'}</p>
             <p><strong>Completed:</strong> <span class="completion-status">${course.completed ? 'Yes' : 'No'}</span></p>
        </div>  
    `;    

        courseContainer.appendChild(card);
    });
}

// Filter courses based on completion status
function filterCourses(completed) {
    if (completed === 'all') {
        return courses;
    }

    // Convert completed to boolean (true or false)
    const isCompleted = completed === 'true';
    return courses.filter(course => course.completed === isCompleted);
}

// Sort courses by the specified property
function sortCourses(courseList, sortBy = 'number') {
    return [...courseList].sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'number') {
            return a.number - b.number;
        }
        return 0;
    });
}

// Update the course display
function updateCourseDisplay() {
    const completionFilter = document.getElementById('completionFilter');
    const sortBySelect = document.getElementById('sortBy');
    
    // Get filtered courses
    const filteredCourses = filterCourses(completionFilter.value);
    
    // Sort the filtered courses
    const sortedCourses = sortCourses(filteredCourses, sortBySelect.value);
    
    // Create cards with the final list
    createCourseCards(sortedCourses);
}

// Initialize course display and filters
function initializeCourseDisplay() {
    const completionFilter = document.getElementById('completionFilter');
    const sortBySelect = document.getElementById('sortBy');
    
    // Add event listeners to the filters
    if (completionFilter) {
        completionFilter.addEventListener('change', updateCourseDisplay);
    }
    
    if (sortBySelect) {
        sortBySelect.addEventListener('change', updateCourseDisplay);
    }
    
    // Initial display
    updateCourseDisplay();
}

// Run functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCourseDisplay();
});