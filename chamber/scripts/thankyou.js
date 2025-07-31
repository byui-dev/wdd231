document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const confirmation = document.getElementById('confirmation')

  if (!confirmation) return;

  const entries = [...params.entries()];

  if (entries.length === 0) {
    confirmation.innerHTML = '<p>No data submitted.</p>';
  }
  else {
    confirmation.innerHTML = '<h2>Thank You!</h2>';
    entries.forEach(([key, value]) => {
      const p = document.createElement('p');
      p.textContent = `${key}: ${value}`;
      confirmation.appendChild(p);
    });
  }
  
