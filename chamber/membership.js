// ...existing code...
async function loadModals() {
    const wrapper = document.querySelector('.modal-wrapper');
    wrapper.innerHTML = ''; // Clear existing modals

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

const modalWrapper = document.querySelector('.modal-wrapper');
modalWrapper.innerHTML = ''; // Clear existing modals
data.forEach(level => {
    const modal = createModal(level.name, level.benefits.join(', '), `$${level.price}`);
    modalWrapper.appendChild(modal);
});
// ...existing code...
