const container = document.querySelector('.container');

fetch('members.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

            const image = document.createElement('img');
            image.src = item.imageUrl; // Updated to match JSON property
            image.alt = item.name;
            image.classList.add('card-image');

            const name = document.createElement('h2');
            name.textContent = item.name;

            const description = document.createElement('p');
            description.textContent = item.description;

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);

            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
