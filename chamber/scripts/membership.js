document.addEventListener("DOMContentLoaded", () => {
    const memberships = [
        { name: "NP Membership", price: 0, benefits: ["Basic support", "Limited access to resources"] },
        { name: "Bronze", price: 10, benefits: ["Standard support", "Access to resources"] },
        { name: "Silver", price: 20, benefits: ["Priority support", "Full access to resources"] },
        { name: "Gold", price: 50, benefits: ["24/7 support", "Custom resources", "Dedicated account manager"] },
    ];

    const infoContainer = document.getElementById("info-container");
    const modalsContainer = document.getElementById("modals-container");
    const modalOverlay = document.getElementById("modal-overlay");

    if (!infoContainer || !modalsContainer || !modalOverlay) {
        console.error("Required DOM elements are missing."):
        return;
    }

    memberships.forEach((membership, index) => {
        // Create card
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <h3>${membership.name}</h3>
        <p>Price: $${membership.price}</p>
        <p>Benefits: ${membership.benefits.join}(",")</p>
    `;
        card.addEventListener("click", () => openModal(index));
        infoContainer.appendChild(card);

        // Create modal
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.id = `modal-${index}`;
        modal.innerHTML = `
       <h2>${membership.name}</h2>  
       <p>${membership.benefits}</p>
       <p><strong>${membership.price}</strong></p>
       <button class="close-modal">Close</button> 
    `;
        modalsContainer.appendChild(modal);
    });

    function openModal(index) {
        document.getElementById(`modal-${index}`).classList.add("active");
        modalOverlay.classList.add("active");
    }

    function closeModal(index) {
        document.getElementById(`modal-${index}`).classList.remove("active");
        modalOverlay.classList.remove("active");
    }

    modalOverlay.addEventListener("click", () => {
        document.querySelectorAll(".modal").forEach(modal => modal.classList.remove("active"));
        modalOverlay.classList.remove("active");
    });

