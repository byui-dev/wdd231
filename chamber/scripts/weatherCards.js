// OpenWeatherMap API configuration
const OPENWEATHER_API_KEY = 'YOUR_API_KEY_HERE';
const CITY = 'Mahikeng';
const UNITS = 'imperial';

// Function to get weather icon
function getWeatherIconURL(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Function to fetch current weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${OPENWEATHER_API_KEY}&units=${UNITS}`
        );

        if (!response.ok) {
            throw new Error('Weather data could not be fetched');
        }

        const data = await response.json();
        return {
            title: `Current Weather in ${CITY}`,
            temperature: `${Math.round(data.main.temp)}°F`,
            description: data.weather[0].description,
            iconURL: getWeatherIconURL(data.weather[0].icon),
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed} mph`
        };
    } catch (error) {
        console.error('Error fetching current weather:', error);
        return {
            title: 'Weather unavailable',
            description: 'Could not retrieve current weather data',
            iconURL: ''
        };
    }
}

// Function to fetch 3 day forecast
async function fetchWeatherForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${OPENWEATHER_API_KEY}&units=${UNITS}`
        );

        if (!response.ok) {
            throw new Error('Forecast data could not be fetched');
        }

        const data = await response.json();

        // Process forecast for next 3 days
        const forecast = [];
        const processedDates = new Set();

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short' });

            if (!processedDates.has(formattedDate) && forecast.length < 3) {
                forecast.push({
                    day: formattedDate,
                    temperature: `${Math.round(item.main.temp)}°F`,
                    description: item.weather[0].description,
                    iconURL: getWeatherIconURL(item.weather[0].icon)
                });
                processedDates.add(formattedDate);
            }
        });

        return {
            title: `3 Day Forecast for ${CITY}`,
            forecast: forecast
        };
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        return {
            title: 'Forecast unavailable',
            forecast: []
        };
    }
}

// Function to create cards
async function createWeatherCards() {
    const smallCardContainer = document.querySelector('.card-container-small');
    smallCardContainer.innerHTML = ''; // Clear existing cards

    // Fetch current weather and forecast
    const currentWeather = await fetchCurrentWeather();
    const forecastData = await fetchWeatherForecast();

    // Current Weather Card
    const currentWeatherCard = document.createElement('div');
    currentWeatherCard.className = 'card';
    currentWeatherCard.innerHTML = `
       <img src="${currentWeather.iconURL}" alt="Weather Icon" class="weather-icon">
       <div class="card-content">
            <h3>${currentWeather.title}</h3>
            <p>Temperature: ${currentWeather.temperature}</p>
            <p>Conditions: ${currentWeather.description}</p>
            <p>Humidity: ${currentWeather.humidity}</p>
            <p>Wind Speed: ${currentWeather.windSpeed}</p>
       </div>      
    `;

    // Forecast Card
    const forecastCard = document.createElement('div');
    forecastCard.className = 'card';
    
    let forecastHTML = `<div class="card-content">
        <h3>${forecastData.title}</h3>
    `;
      
    forecastData.forecast.forEach(day => {
        forecastHTML += `
            <div class="forecast-day">
                 <img src="${day.iconURL}" alt="Forecast Icon" class="weather-icon">
                 <p>${day.day}: ${day.temperature}</p>
                 <p>${day.description}</p>
            </div>           
        `;
    });    

    forecastHTML += '</div>'; 
    forecastCard.innerHTML = forecastHTML;

    // Upcoming events card
    const eventsCard = document.createElement('div');
    eventsCard.className = 'card';
    eventsCard.innerHTML = `
         <div class="card-content">
              <h3>Upcoming Events</h3>
              <p>The Mahikeng Chamber of Commerce Annual General Meeting, 17 April 2025, Venue: Mahikeng Chamber of Commerce Building</p>
         </div>
    `;          

    // Append cards to container
    smallCardContainer.appendChild(eventsCard);
    smallCardContainer.appendChild(currentWeatherCard);
    smallCardContainer.appendChild(forecastCard);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', createWeatherCards);