document.addEventListener('DOMContentLoaded', () => {
  // Fetch and render the membership modals
  fetch('data/membershipLevels.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(memberships => {
      const modalsContainer = document.getElementById('modals-container');
      if (!modalsContainer) {
        console.error('Could not find the modals container element.');
        return;
      }

      memberships.forEach(membership => {
        // Create button to open modal
        const openBtn = document.createElement('button');
        openBtn.textContent = membership.name;
        openBtn.classList.add('modal-button');
        openBtn.setAttribute('aria-label', `Open ${membership.name} membership modal`);

        // Create dialog modal
        const modal = document.createElement('dialog');
        modal.innerHTML = `
          <h2>${membership.name}</h2>
          <p>Price: ${membership.price}</p>
          <button class="show-more-info" aria-expanded="false">Show More Info</button> 
          <div class="more-info" style="display: none;">
            <ul>
              ${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
          </div>
          <button class="close-modal">Close</button>
        `;

        modalsContainer.appendChild(openBtn);
        modalsContainer.appendChild(modal);

        // Open modal
        openBtn.addEventListener('click', () => {
          modal.showModal();
        });

        // Toggle more info
        const showMoreBtn = modal.querySelector('.show-more-info');
        const moreInfoDiv = modal.querySelector('.more-info');
        showMoreBtn.addEventListener('click', () => {
          const isVisible = moreInfoDiv.style.display === 'block';
          moreInfoDiv.style.display = isVisible ? 'none' : 'block';
          showMoreBtn.setAttribute('aria-expanded', !isVisible);
        });

        // Close modal with button
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
          modal.close();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (event) => {
          if (event.target === modal) {
            modal.close();
          }
        });
      });
    })
    .catch(error => {
      console.error('Error fetching membership levels:', error);
    });

  // Handle form submission
  const form = document.getElementById('membership-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const timestampField = document.getElementById('timestamp');
      if (timestampField) {
        timestampField.value = new Date().toISOString();
      }

      const formData = new FormData(form);
      const params = new URLSearchParams();

      for (const [key, value] of formData.entries()) {
        params.append(key, value);
      }

      window.location.href = `thankyou.html?${params.toString()}`;
    });
  }
});
