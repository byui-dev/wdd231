// JSON file 
const data = [
    { id: 'np', name: 'NP Membership Level', price: 0, benefits: ['Special Support for Non Profit Organizations', 'Training'] },
    { id: 'bronze', name: 'Bronze Membership Level', price: 10, benefits: ['Special Events', 'Training'] },
    { id: 'silver', name: 'Silver Membership Level', price: 20, benefits: ['Special Events', 'Training', 'Event Discounts'] },
    { id: 'gold', name: 'Gold Membership Level', price: 50, benefits: ['Special Events', 'Training', 'Advertising through main website', 'Event Discounts'] }
];

async function loadModals() {
    const wrapper = document.querySelector('.modal-wrapper');

    data.forEach(modal => {
        // Create card
        const card = document.createElement('div');
        card.classList.add('modal-card');
        card.innerHTML = `
            <h3>${modal.name}</h3>
            <p>$${modal.price}</p>
            <button onclick="openModal('${modal.id}')">Show More</button>
        `;
        wrapper.appendChild(card);

        // Create modal
        const dialog = document.createElement('dialog');
        dialog.classList.add('modal');
        dialog.setAttribute('id', modal.id);
        dialog.innerHTML = `
            <h3>${modal.name}</h3>
            <ul>
                ${modal.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
            <button onclick="closeModal('${modal.id}')">Close</button>
        `;
        document.body.appendChild(dialog);
    });
}

function openModal(id) {
    const modal = document.getElementById(id);
    modal.showModal();
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.close();
}

// Load modals when the document is ready
document.addEventListener('DOMContentLoaded', loadModals);

function createCard(title, description) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    document.querySelector('.card-container').appendChild(card);
}

// Example usage
createCard('Gold Membership', 'Exclusive benefits for gold members.');
createCard('Silver Membership', 'Affordable benefits for silver members.');

function createModal(title, description, price) {
    const modal = document.createElement('div');
    modal.className = 'modal'; 

    const modalTitle = document.createElement('h3');
    modalTitle.textContent = title;

    const modalDescription = document.createElement('p');
    modalDescription.textContent = description;

    const modalPrice = document.createElement('p');
    modalPrice.textContent = `Price: ${price}`;

    modal.appendChild(modalTitle);
    modal.appendChild(modalDescription);
    modal.appendChild(modalPrice);

    return modal;
}


const modalWrapper = document.querySelector('.modal-wrapper');
modalWrapper.innerHTML = ''; // Clear existing modals
membershipLevels.forEach(level => {
    const modal = createModal(level.title, level.description, level.price);
    modalWrapper.appendChild(modal);
});
