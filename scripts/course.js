// Menu toggle for mobile
        document.getElementById('menuToggle').addEventListener('click', function() {
            document.getElementById('mainMenu').classList.toggle('active');
        });

        // Data for the cards
        const cardsData = [
            {
                id:1,
                title: "Course Work"
            },
            {
                id:2,
                title: "Mahikeng,South Africa"
                image: "url for the picture"
            },
            {   
                id:3,
                title: "Web and Computer Programming Certificate"
            },
        ];

        // Define category colors
        const categoryColors = {
            "completed": "#3498db",     // For completed courses
            "notCompleted": "#e74c3c", // For courses not completed
            "all": "#8e44ad"           // For all courses
        };

        // Data for the colored items
        const itemsData = [
            {id:1, courseName: "Introduction to Programming", color: "#3498db", category: "completed" },
            {id:2, courseName: "Web Fundamentals", color: "#3498db", category: "completed"},
            {id:3, courseName: "Programming with Classes", color: "#3498db", category: "completed"},
            {id:4, courseName: "Frontend Web Development I", color: "#e74c3c", category: "notCompleted"}
        ];
 
        // Filter categories and include all courses
        const categories = [
            { courseName : "All", filter: null, color: categoryColors.all},
            { courseName : "CSE", filter: "completed", color: categoryColors.completed},
            { courseName: "WDD", filter: "notCompleted", color: categoryColors.notCompleted }
        ];

        // function to create the cards
        function createCards() {
            const container = document.getElementById('cardsContainer');

            // Create the first two cards
            for (let i = 0; i < 2; i++);
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

            tab.addEventListener('click', function() {
                // Set active tab
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Filter items
                filterItems(category.filter);
            });

            tabsContainer.appendChild(tab);
        });

        thirdCard.appendChild(tabsContainer);

        // Create items container
        const itemsContainer = document.createElement('div');
        cardsContainer.className = 'items-container';
        cardsContainer.id = 'itemsContainer';

        // Create items with color that will match their category
        itemsData.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.dataset.category = item.category;

        // Set the color based on item's category

        }
        
        
 