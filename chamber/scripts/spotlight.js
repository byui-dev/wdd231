document.addEventListener('DOMContentLoaded', () => {
    // Validate the spotlight container
    const spotlightContainer = document.getElementById("spotlight-section");
    if (!spotlightContainer) {
        console.error("Spotlight section not found. Ensure the ID 'spotlight-section' exists in the HTML.");
    }

    // JSON data source
    const membersData = [
        {
            "name": "Kagiso Technologies",
            "type": "IT Services",
            "address": "48 Beyers Naude Drive, Mahikeng, 2745",
            "phone": "+27 18 392 6000",
            "website": "https://www.kagisotechnologies.co.za",
            "imageUrl": "https://i.ibb.co/0yYgvV19/business-1.jpg",
            "membership": "3"
        },
        {
            "name": "Mahikeng Agricultural Supplies",
            "type": "Agriculture",
            "address": "27 Loop Street, Industrial Area, Mahikeng, 2745",
            "phone": "+27 18 397 1234",
            "website": "https://www.mahikengag.com",
            "imageUrl": "https://i.ibb.co/5X1hNH9w/business-2.jpg",
            "membership": "2"
        },
        {
            "name": "Royal Bafokeng Platinum",
            "type": "Mining",
            "address": "Lefaragae Office Park, Mahikeng, 2745",
            "phone": "+27 18 484 7000",
            "website": "https://www.royalbafokengplatinum.co.za",
            "imageUrl": "https://i.ibb.co/27gvv9Jj/business-3.jpg",
            "membership": "3"
        },
        {
            "name": "Mmabatho Printing Services",
            "type": "Printing",
            "address": "22 Sekhing Street, CBD, Mahikeng, 2745",
            "phone": "+27 18 381 5678",
            "website": "https://www.mmabathoprint.co.za",
            "imageUrl": "https://i.ibb.co/GhMCMjx/business-4.jpg",
            "membership": "1"
        },
        {
            "name": "Mahikeng Legal Consultants",
            "type": "Legal Services",
            "address": "15 Modiri Molema Drive, Mahikeng, 2745",
            "phone": "+27 18 392 4567",
            "website": "https://www.mahikenglegal.com",
            "imageUrl": "https://i.ibb.co/MDtq7Mh2/business-5.jpg",
            "membership": "1"
        },
        {
            "name": "Olive Tree Restaurant",
            "type": "Restaurant",
            "address": "12 Boom Street, Mahikeng, 2745",
            "phone": "+27 18 381 2345",
            "website": "https://www.olivetreerestaurant.co.za",
            "imageUrl": "https://i.ibb.co/nMDv428W/business-6.jpg",
            "membership": "1"
        },
        {
            "name": "NorthWest Tech Solutions",
            "type": "Software Development",
            "address": "45 Francis Baard Street, Mahikeng, 2745",
            "phone": "+27 18 397 8901",
            "website": "https://www.nwtech.co.za",
            "imageUrl": "https://i.ibb.co/ks0VDZXj/business-7.jpg",
            "membership": "2"
        },
        {
            "name": "Mahikeng Farmers Cooperative",
            "type": "Farming Cooperative",
            "address": "33 Sekhing Road, Industrial Area, Mahikeng, 2745",
            "phone": "+27 18 392 2222",
            "website": "https://www.mahikengfarmers.co.za",
            "imageUrl": "https://i.ibb.co/1fQZj4tG/business-8.jpg",
            "membership": "1"
        }
    ];

    // Filter members based on membership levels 2 and 3
    const filterMembers = membersData.filter(
        member => member.membership === "2" || member.membership === "3"
    );

    // Randomly select 2 or 3 spotlight items
    const getRandomSpotlights = (arr, num) => {
        let shuffled = [...arr].sort(() => 0.5 - Math.random()); // Copy array before sorting
        return shuffled.slice(0, num);
    };

    const spotlightItems = getRandomSpotlights(filterMembers, Math.floor(Math.random() * 2) + 2); // Picks 2 or 3 items

    spotlightItems.forEach((member, index) => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card", "fade-in");
        card.style.animationDelay = `${index = 0.3}s`;

        card.innerHTML = `
            <img src="${member.imageUrl}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Type:</strong> ${member.type}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;
        spotlightContainer.appendChild(card);
    });
});












