document.addEventListener('DOMContentLoaded', () => {
  const modalsContainer = document.getElementById('modals-container');
  const form = document.getElementById('membership-form');

  fetch('data/membershipLevels.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(memberships => {
      memberships.forEach(membership => {
        // Modal card always visible
        const modalCard = document.createElement('div');
        modalCard.classList.add('membership-card');

        modalCard.innerHTML = `
          <h3>${membership.name}</h3>
          <p>Price: ${membership.price}</p>
          <button class="open-modal">More Info</button>
          <dialog>
            <h4>${membership.name} Benefits</h4>
            <div class="benefits-section">
              <ul class="benefits-list" hidden>
                ${membership.benefits.map(b => `<li>${b}</li>`).join('')}
              </ul>
              <button class="toggle-info" aria-expanded="false">Show More Info</button>
            </div>
            <button class="close-modal">Close</button>
          </dialog>
        `;

        modalsContainer.appendChild(modalCard);

        const dialog = modalCard.querySelector('dialog');
        const openBtn = modalCard.querySelector('.open-modal');
        const closeBtn = dialog.querySelector('.close-modal');
        const toggleBtn = dialog.querySelector('.toggle-info');
        const benefitsList = dialog.querySelector('.benefits-list');

        openBtn.addEventListener('click', () => {
          dialog.showModal();
        });

        closeBtn.addEventListener('click', () => {
          dialog.close();
        });

        toggleBtn.addEventListener('click', () => {
          const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
          benefitsList.hidden = isExpanded;
          toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
          toggleBtn.textContent = isExpanded ? 'Show More Info' : 'Show Less Info';
        });

        // Optional: click outside dialog to close
        dialog.addEventListener('click', (e) => {
          if (e.target === dialog) dialog.close();
        });
      });
    })
    .catch(error => console.error('Error fetching membership levels:', error));

  // Form submission
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const timestampField = document.getElementById('timestamp');
      if (timestampField) {
        timestampField.value = new Date().toISOString();
      }
      const formData = new FormData(form);
      const params = new URLSearchParams(formData);
      window.location.href = `thankyou.html?${params.toString()}`;
    });
  }
});
