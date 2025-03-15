// Course data
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true // Changed to true for demonstration
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true // Changed to true for demonstration
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true // Changed to true for demonstration
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Data for the cards
const cardsData = [
    {
        id: 1,
        title: "Course Work",
        content: "."
    },
    {
        id: 2,
        title: "Mahikeng, South Africa",
        image: "images/mahikeng_pic.jpeg" // Placeholder image path
    
    },
    {
        id: 3,
        title: "Web and Computer Programming Certificate",
    }
];

// Define category colors
const categoryColors = {
    "CSE": "#3498db",     // Blue for CSE courses
    "WDD": "#e74c3c",     // Red for WDD courses
    "all": "#8e44ad",     // Purple for all courses
    "completed": "#27ae60", // Green for completed courses
    "notCompleted": "#f39c12" // Orange for not completed courses
};

// Filter categories
const categories = [
    { name: "All", filter: "all", color: categoryColors.all },
    { name: "CSE", filter: "CSE", color: categoryColors.CSE },
    { name: "WDD", filter: "WDD", color: categoryColors.WDD },
    { name: "Completed", filter: "completed", color: categoryColors.completed },
    { name: "Not Completed", filter: "notCompleted", color: categoryColors.notCompleted }
];

// function to create the cards
function createCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) return; // Safety check

    // Clear existing content
    container.innerHTML = '';

    // Create the first two cards
    for (let i = 0; i < 2; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        const heading = document.createElement('h2');
        heading.textContent = cardsData[i].title;
        card.appendChild(heading);

        const content = document.createElement('p');
        content.textContent = cardsData[i].content;
        card.appendChild(content);

        // Add image for the second card
        if (cardsData[i].image) {
            const image = document.createElement('img');
            image.src = cardsData[i].image;
            image.alt = cardsData[i].title;
            image.className = "card-image";
            card.appendChild(image);
        }

        container.appendChild(card);
    }

    // Create the third card 
    const thirdCard = document.createElement('div');
    thirdCard.className = 'card card-full';

    const thirdHeading = document.createElement('h2');
    thirdHeading.textContent = cardsData[2].title;
    thirdCard.appendChild(thirdHeading);

    const thirdContent = document.createElement('p');
    thirdContent.textContent = cardsData[2].content;
    thirdCard.appendChild(thirdContent);

    // Create tabs with color coding
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs';

    categories.forEach((category, index) => {
        const tab = document.createElement('button');
        tab.className = 'tab';
        if (index === 0) tab.classList.add('active');
        tab.textContent = category.name;
        tab.dataset.filter = category.filter;

        // Set the tab color based on category
        tab.style.backgroundColor = category.color;
        tab.style.color = '#ffffff'; // White text for better contrast

        tab.addEventListener('click', function() {
            // Set active tab
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            filterItems(this.dataset.filter);
        });

        tabsContainer.appendChild(tab);
    });

    thirdCard.appendChild(tabsContainer);

    // Create items container
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'items-container';
    itemsContainer.id = 'itemsContainer';

    // Create items for each course
    courses.forEach(course => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        
        // Set multiple data attributes for flexible filtering
        itemElement.dataset.subject = course.subject;
        itemElement.dataset.completed = course.completed ? "completed" : "notCompleted";
        
        // Set the color based on completion status
        const backgroundColor = course.completed ? categoryColors.completed : categoryColors.notCompleted;
        itemElement.style.backgroundColor = backgroundColor;
        itemElement.style.color = '#ffffff'; // White text for better contrast

        // Create the course code display - simplified to just show the code
        const courseCode = document.createElement('div');
        courseCode.className = 'course-code';
        courseCode.textContent = `${course.subject} ${course.number}`;
        courseCode.style.fontWeight = 'bold';
        courseCode.style.fontSize = '1.2rem';
        itemElement.appendChild(courseCode);

        // Add click event to show more details
        itemElement.addEventListener('click', function() {
            alert(`${course.subject} ${course.number}: ${course.title}\n\nTechnologies: ${course.technology.join(', ')}\n\nDescription: ${course.description}\n\nStatus: ${course.completed ? 'Completed' : 'Not Completed'}`);
        });

        itemsContainer.appendChild(itemElement);
    });

    thirdCard.appendChild(itemsContainer);
    container.appendChild(thirdCard);
    
    // Initialize filtering to show all items by default
    filterItems("all");
}

// Function to filter items
function filterItems(filter) {
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        if (filter === "all") {
            // Show all items
            item.style.display = 'block';
        } else if (filter === "completed" || filter === "notCompleted") {
            // Filter by completion status
            if (item.dataset.completed === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        } else {
            // Filter by subject (CSE or WDD)
            if (item.dataset.subject === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Initialize the page
window.addEventListener('load', function() {
    createCards();
});