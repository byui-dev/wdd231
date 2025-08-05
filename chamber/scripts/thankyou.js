document.addEventListener('DOMContentLoaded', () => {
  const confirmationDiv = document.getElementById('confirmation')

  // Helper function to format keys
  function formatKey(key) {
    // Capitalize first letter and replace underscores with spaces
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
  }

  // Get all parameters from the URL
  const params = new URLSearchParams(window.location.search);

  if (!params || [...params].length === 0) {
    confirmationDiv.innerHTML = '<p>No confirmation data available.</p>';
  } else {
    const ul = document.createElement('ul');
    params.forEach((value, key) => {
      // Decode and create the key-value pair
      const li = document.createElement('li');
      li.innerHTML = `<strong>${formatKey(key)}:</strong> ${decodeURIComponent(value.replace(/\+/g, ' '))}`;
      ul.appendChild(li);
    });
    confirmationDiv.appendChild(ul);
  }
});

