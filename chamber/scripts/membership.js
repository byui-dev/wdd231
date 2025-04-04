document.addEventListener("DOMContentLoaded", () => {
    const memberships = [
        { name: "NP Membership Level", price: 0, benefits: ["Special Support for Non Profit Organizations", "Training"], link: "np-benefits.html" },
        { name: "Bronze Membership Level", price: 10, benefits: ["Special Events", "Training"], link: "bronze-benefits.html" },
        { name: "Silver Membership Level", price: 20, benefits: ["Special Events", "Training", "Event Discounts"], link: "silver-benefits.html" },
        { name: "Gold Membership Level", price: 50, benefits: ["Special Events", "Training", "Advertising through main website", "Event Discounts"], link: "gold-benefits.html" },
    ];

    const infoContainer = document.getElementById("info-container");
    const modalsContainer = document.getElementById("modals-container");
    const modalOverlay = document.getElementById("modal-overlay");

    if (!infoContainer || !modalsContainer || !modalOverlay) {
        console.error("Required DOM elements are missing");
        return;
    }

    memberships.forEach((membership, index) => {
        // Create card
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${membership.name}</h3>
            <p>Price: $${membership.price}</p>
            <p>Benefits: ${membership.benefits.join(", ")}</p>
        `;
        card.addEventListener("click", () => openModal(index, modalOverlay));
        infoContainer.appendChild(card);

        // Create modal
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.id = `modal-${index}`;
        modal.innerHTML = `
            <h2>${membership.name}</h2>  
            <p>${membership.benefits.join(", ")}</p>
            <p><strong>Price: $${membership.price}</strong></p>
            <a href="${membership.link}" target="_blank" class="more-info">More Info</a>
            <button class="close-modal">Close</button> 
        `;
        modal.querySelector(".close-modal").addEventListener("click", () => closeModal(index, modalOverlay));
        modalsContainer.appendChild(modal);
    });

    modalOverlay.addEventListener("click", () => {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
        });
        modalOverlay.classList.remove("active");
    });
});

function openModal(index, modalOverlay) {
    const modal = document.getElementById(`modal-${index}`);
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    modalOverlay.classList.add("active");
}

function closeModal(index, modalOverlay) {
    const modal = document.getElementById(`modal-${index}`);
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modalOverlay.classList.remove("active");
}

