import { gameReserves } from '../data/gameReserves.mjs';

const apiKey = '48f7fa8f7c68b67d0092de51315e2fa6';
const city = 'Pretoria';

// Fetch current weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById('current-weather').innerHTML = `
      <h3>Current Weather in ${city}</h3>
      <img src="${iconUrl}" alt="${data.weather[0].description}"/>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Conditions: ${data.weather[0].description}</p>
    `;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Fetch 3-Day Forecast
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const forecastContainer = document.getElementById('forecast-weather');
    forecastContainer.innerHTML = `<h3>3-Day Forecast</h3>`;

    // Filter for forecast entries at 12:00 PM
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyForecasts.forEach(forecast => {
      const date = new Date(forecast.dt_txt).toDateString();
      const iconCode = forecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      forecastContainer.innerHTML += `
        <div>
          <p><strong>${date}</strong></p>
          <img src="${iconUrl}" alt=${forecast.weather[0].description}"/>
          <p>Temp: ${forecast.main.temp}°C</p>
          <p>Conditions: ${forecast.weather[0].description}</p>
        </div>
       `;
    });
  });

// Display 2-3 random reserves
function getRandomReserves(num) {
  const shuffled = gameReserves.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const highlightedReserves = getRandomReserves(3);
const reservesContainer = document.getElementById('highlighted-reserves');


highlightedReserves.forEach(reserve => {
  const reserveDiv = document.createElement('div');
  reserveDiv.innerHTML = `
    <h4>${reserve.name}</h4>
    <p>Location: ${reserve.location}</p>
    <p>Accomodation: ${reserve.bookingFees.accomodation}</p>
    <p>Day Visit Fee: ${reserve.bookingFees.dayVisit}</p>
  `;
  reservesContainer.appendChild(reserveDiv);
});

