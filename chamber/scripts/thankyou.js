document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const confirmation = document.getElementById('confirmation')

  if (!confirmation) return;

  const entries = [...params.entries()];

  if (entries.length === 0) {

  }






}
