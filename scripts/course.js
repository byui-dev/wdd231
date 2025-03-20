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
        completed: true
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
        completed: true
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
        completed: true
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
        completed: true
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
        completed: true
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

// Define category colors
const statusColors = {
    "Completed": "#27ae60",   // Green
    "notCompleted": "#e74c3c"  // Red
};

// Function to create cards dynamically
function createCards() {
    const mainContainer = document.querySelector('main');
    if (!mainContainer) return; // Safety check

    // Clear previous content
    mainContainer.innerHTML = '';

    // ========== First Card ==========
    const firstCard = document.createElement('div');
    firstCard.className = 'card';
    firstCard.innerHTML = `
        <div class="card-header" style="background-color: #3498db; color: white;">
            <h2>Course Work</h2>
        </div>
        <p>.</p>
    `;
    mainContainer.appendChild(firstCard);

    // ========== Second Card ==========
    const secondCard = document.createElement('div');
    secondCard.className = 'card';
    secondCard.innerHTML = `
        <div class="card-header" style="background-color:  #3498db; color: white;">
            <h2>Mahikeng, South Africa</h2>
        </div>
        <img src="image.jpg" alt="Sample Image" class="card-image">
        <p>Mahikeng Museum</p>
    `;
    mainContainer.appendChild(secondCard);

    // ========== Third Card ==========
    const thirdCard = document.createElement('div');
    thirdCard.className = 'card responsive-card';

    // Third Card Heading
    thirdCard.innerHTML = `
        <div class="card-header" style="background-color:  #3498db; color: white;">
            <h2>Web and Computer Programming Certificate/h2>
        </div>
    `;

    // Filter Buttons Container
    const filterTabsContainer = document.createElement('div');
    filterTabsContainer.className = 'tab-container';

    ["All", "CSE", "WDD"].forEach(category => {
        const tab = document.createElement('button');
        tab.className = 'tab';
        tab.textContent = category;
        tab.addEventListener('click', () => filterItems(category));
        filterTabsContainer.appendChild(tab);
    });

    thirdCard.appendChild(filterTabsContainer);

    // Non-Clickable Status Buttons
    const objectTabsContainer = document.createElement('div');
    objectTabsContainer.className = 'tab-container';

    dataObjects.forEach(item => {
        const tab = document.createElement('button');
        tab.className = 'object-tab';
        tab.textContent = item.name;
        tab.dataset.status = item.status;
        tab.style.backgroundColor = statusColors[item.status];

        // Hover Effect
        tab.addEventListener('mouseover', function () {
            this.style.backgroundColor = "#555";
        });
        tab.addEventListener('mouseout', function () {
            this.style.backgroundColor = statusColors[item.status];
        });

        objectTabsContainer.appendChild(tab);
    });

    thirdCard.appendChild(objectTabsContainer);

    // Content Area for Displaying Filtered Objects
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'items-container';
    itemsContainer.id = 'itemsContainer';
    thirdCard.appendChild(itemsContainer);

    mainContainer.appendChild(thirdCard);

    // Initialize with "All" filter
    filterItems("All");
}

// Function to filter displayed items
function filterItems(filter) {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = ''; // Clear previous items

    let filteredData = dataObjects;
    if (filter === "CSE") {
        filteredData = dataObjects.filter(item => item.category === "CSE");
    } else if (filter === "WDD") {
        filteredData = dataObjects.filter(item => item.category === "WDD");
    }

    filteredData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.textContent = `${item.name} (${item.category})`;
        itemDiv.style.backgroundColor = statusColors[item.status]; // Apply color based on status
        itemsContainer.appendChild(itemDiv);
    });
}

// Initialize the cards when the page loads
window.addEventListener('load', createCards);
