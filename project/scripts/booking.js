import { gameReserves } from '../data/gameReserves.mjs';

const reserveNameSelect = document.getElementById('reserve-name');

// Populate reserve name options
gameReserves.forEach((gameReserve) => {
    const optionElement = document.createElement('option');

    optionElement.value = gameReserve.name;

    optionElement.textContent = gameReserve.name;

    reserveNameSelect.appendChild(optionElement);

});

// Handle form submission
document.getElementById('booking-form').addEventListener('submit', (event) => {

    event.preventDefault();

    const formData = new FormData(event.target);

    const selectedReserve = gameReserves.find((gameReserve) => gameReserve.name === formData.get('reserve-name'));

    const bookingDetails = {

        reserveName: selectedReserve.name,

        location: selectedReserve.location,

        accommodationType: formData.get('accommodation-type'),

        arrivalDate: formData.get('arrival-date'),

        departureDate: formData.get('departure-date'),

        numberOfGuests: formData.get('number-of-guests'),

        bookingFees: selectedReserve.bookingFees,

    };

    // Save booking details to local storage

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    // display thank you page

    document.getElementById('booking-form').style.display = 'none';

    document.getElementById('thank-you-page').style.display = 'block';

    const bookingSummaryContent = `

   <p>Reserve Name: ${bookingDetails.reserveName}</p>
   
   <p>Location: ${bookingDetails.location}</p>

   <p>Accommodation Type: ${bookingDetails.accommodationType}</p>

   <p>Arrival Date: ${bookingDetails.arrivalDate}</p>

   <p>Departure Date: ${bookingDetails.departureDate}</p>

   <p>Number of Guests: ${bookingDetails.numberOfGuests}</p>

   <p>Booking Fees: Accomodation: R${bookingDetails.bookingFees.accommodation}, Day Visit - R${bookingDetails.bookingFees.dayVisit}</p>
  `;

    document.getElementById('booking-summary').innerHTML = bookingSummaryContent;

    // display modal

    const modalContent = `
  
  <h2>${bookingDetails.reserveName}</h2>
  
  <p>Location: ${bookingDetails.location}</p>

  <p>Extra Services: ${selectedReserve.extraServices.join(', ')}</p>

  <p>Image: <img src="${selectedReserve.image}" alt="${selectedReserve.reserveName}"</p>
 `;
 
 document.getElementById('modal-container').innerHTML = modalContent;

 document.getElementById('modal-container').style.display = 'block';

});