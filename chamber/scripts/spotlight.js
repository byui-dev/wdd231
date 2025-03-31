document.addEventListener('DOMContentLoaded', () => {
    const spotlightContainer = document.getElementById("spotlight-section");

    // JSON data source
{
    const membersData = [
            {
                "name": "Kagiso Technologies",
                "address": "48 Beyers Naude Drive, Mahikeng, 2745",
                "phone": "+27 18 392 6000",
                "website": "https://www.kagisotechnologies.co.za",
                "imageUrl": "https://ibb.co/0yYgvV19",
                "type": "IT Solutions",
                "membershipLevel": 3
            },
            {
                "name": "Mahikeng Agricultural Supplies",
                "address": "27 Loop Street, Industrial Area, Mahikeng, 2745",
                "phone": "+27 18 397 1234",
                "website": "https://www.mahikengag.com",
                "imageUrl": "https://ibb.co/5X1hNH9w",
                "type": "Agricultural Equipment",
                "membershipLevel": 2
            },
            {
                "name": "Royal Bafokeng Platinum",
                "address": "Lefaragae Office Park, Mahikeng, 2745",
                "phone": "+27 18 484 7000",
                "website": "https://www.royalbafokengplatinum.com",
                "imageUrl": "https://ibb.co/27gvv9Jj",
                "type": "Mining and Exploration",
                "membershipLevel": 3
            },
            {
                "name": "Mmabatho Printing Services",
                "address": "22 Sekhing Street, CBD, Mahikeng, 2745",
                "phone": "+27 18 381 5678",
                "website": "https://www.mmabathoprint.co.za",
                "imageUrl": "https://ibb.co/GhMCMjx",
                "type": "Printing and Design",
                "membershipLevel": 1
            },
            {
                "name": "Mahikeng Legal Consultants",
                "address": "15 Modiri Molema Drive, Mahikeng, 2745",
                "phone": "+27 18 392 4567",
                "website": "https://www.mahikenglegal.com",
                "imageUrl": "https://ibb.co/MDtq7Mh2",
                "type": "Legal Services",
                "membershipLevel": 1
            },
            {
                "name": "Olive Tree Restaurant",
                "address": "12 Boom Street, Mahikeng, 2745",
                "phone": "+27 18 381 2345",
                "website": "https://www.olivetreerestaurant.co.za",
                "imageUrl": "https://ibb.co/nMDv428W",
                "type": "Dining",
                "membershipLevel": 1
            },
            {
                "name": "NorthWest Tech Solutions",
                "address": "45 Francis Baard Street, Mahikeng, 2745",
                "phone": "+27 18 397 8901",
                "website": "https://www.nwtech.co.za",
                "imageUrl": "https://ibb.co/ks0VDZXj",
                "type": "IT Consulting",
                "membershipLevel": 2
            },
            {
                "name": "Mahikeng Farmers Cooperative",
                "address": "33 Sekhing Road, Industrial Area, Mahikeng, 2745",
                "phone": "+27 18 392 2222",
                "website": "https://www.mahikengfarmers.co.za",
                "imageUrl": "https://ibb.co/1fQZj4tG",
                "type": "Agricultural Cooperative",
                "membershipLevel": 1
            }
        ];
    

    // Filter members based on membership levels 2 and 3
    const filterMembers = membersData.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    // Randomly select 2 or 3 spotlight items
    const getRandomSpotlights = (arr, num) => {
        let shuffled = [...arr].sort(() => 0.5 - Math.random()); // Copy array before sorting
        return shuffled.slice(0, num);
    };

    const spotlightItems = getRandomSpotlights(filterMembers, Math.floor(Math.random() * 2) + 2); // Picks 2 or 3 items

    // Generate spotlight cards
    spotlightItems.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
            <img src="${member.imageUrl}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Type:</strong> ${member.type}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlightContainer.appendChild(card);
    });
});











