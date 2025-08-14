import { gameReserves } from '../data/gameReserves.mjs';

const apiKey = '48f7fa8f7c68b67d0092de51315e2fa6';
const city = 'Pretoria';

// Modern async/await with try/catch
async function fetchCurrentWeather() {
    try {
        // Show loading state
        document.getElementById('current-weather').innerHTML = 
            '<div class="weather-loading">Loading weather data...</div>';
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Process and display data
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        document.getElementById('current-weather').innerHTML = `
            <h3>Current Weather in ${city}</h3>
            <img src="${iconUrl}" alt="${data.weather[0].description}"/>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Conditions: ${data.weather[0].description}</p>
        `;
        
    } catch (error) {
        console.error('Weather fetch failed:', error);
        
        // User-friendly error display
        document.getElementById('current-weather').innerHTML = 
            `<div class="weather-error">
                Unable to load weather data. Please check your internet connection.
                <br><small>Error: ${error.message}</small>
            </div>`;
    }
}

async function fetchWeatherForecast() {
    try {
        // Show loading state
        document.getElementById('forecast-weather').innerHTML = 
            '<div class="weather-loading">Loading forecast...</div>';
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        const forecastContainer = document.getElementById('forecast-weather');
        forecastContainer.innerHTML = `<h3>3-Day Forecast</h3>`;
        
        // Filter for forecast entries at 12:00 PM
        const dailyForecasts = data.list
            .filter(item => item.dt_txt.includes('12:00:00'))
            .slice(0, 3);
        
        dailyForecasts.forEach(forecast => {
            const date = new Date(forecast.dt_txt).toDateString();
            const iconCode = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            
            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <p><strong>${date}</strong></p>
                    <img src="${iconUrl}" alt="${forecast.weather[0].description}"/>
                    <p>Temp: ${forecast.main.temp}°C</p>
                    <p>Conditions: ${forecast.weather[0].description}</p>
                </div>
            `;
        });
        
    } catch (error) {
        console.error('Forecast fetch failed:', error);
        
        document.getElementById('forecast-weather').innerHTML = 
            `<div class="weather-error">
                Unable to load forecast data.
                <br><small>Error: ${error.message}</small>
            </div>`;
    }
}

// ========================================
// EXAMPLE 2: Enhanced Data Loading with Async
// ========================================

async function loadGameReservesData() {
    try {
        // Simulate async data loading (could be from API)
        const reserves = await new Promise((resolve) => {
            setTimeout(() => resolve(gameReserves), 100);
        });
        
        displayRandomReserves(reserves);
        
    } catch (error) {
        console.error('Failed to load game reserves:', error);
        
        document.getElementById('highlighted-reserves').innerHTML = 
            `<div class="error">Failed to load game reserves data.</div>`;
    }
}

function displayRandomReserves(reserves) {
    const highlightedReserves = getRandomReserves(reserves, 3);
    const reservesContainer = document.getElementById('highlighted-reserves');
    
    reservesContainer.innerHTML = ''; // Clear existing content
    
    highlightedReserves.forEach(reserve => {
        const reserveDiv = document.createElement('div');
        reserveDiv.className = 'spotlight-card';
        
        reserveDiv.innerHTML = `
            <h4>${reserve.name}</h4>
            <p><strong>Location:</strong> ${reserve.location}</p>
            <p><strong>Accommodation:</strong> R${reserve.bookingFees.accommodation}</p>
            <p><strong>Day Visit Fee:</strong> R${reserve.bookingFees.dayVisit}</p>
        `;
        
        reservesContainer.appendChild(reserveDiv);
    });
}

function getRandomReserves(reserves, num) {
    const shuffled = [...reserves].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// ========================================
// EXAMPLE 3: Multiple API Calls with Promise.all
// ========================================

async function loadAllData() {
    try {
        // Show loading state for everything
        document.body.classList.add('loading');
        
        // Execute multiple async operations concurrently
        const [weatherData, forecastData, reservesData] = await Promise.all([
            fetchWeatherData(),
            fetchForecastData(),
            loadReservesData()
        ]);
        
        // Process all data
        displayWeatherData(weatherData);
        displayForecastData(forecastData);
        displayReservesData(reservesData);
        
        console.log('All data loaded successfully');
        
    } catch (error) {
        console.error('Failed to load application data:', error);
        
        // Show global error message
        document.body.innerHTML = 
            `<div class="global-error">
                Application failed to load. Please refresh the page.
                <br><small>Error: ${error.message}</small>
            </div>`;
            
    } finally {
        // Remove loading state regardless of success/failure
        document.body.classList.remove('loading');
    }
}

// Helper functions for the Promise.all example
async function fetchWeatherData() {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    
    if (!response.ok) throw new Error('Weather API failed');
    return await response.json();
}

async function fetchForecastData() {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    
    if (!response.ok) throw new Error('Forecast API failed');
    return await response.json();
}

async function loadReservesData() {
    // Simulate async loading
    return new Promise(resolve => {
        setTimeout(() => resolve(gameReserves), 50);
    });
}

// ========================================
// EXAMPLE 4: Retry Logic with Exponential Backoff
// ========================================

async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} for ${url}`);
            
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
            
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed:`, error.message);
            
            // Don't wait after the last attempt
            if (attempt < maxRetries) {
                // Exponential backoff: 1s, 2s, 4s
                const delay = Math.pow(2, attempt - 1) * 1000;
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
}

// Usage of retry logic
async function robustWeatherFetch() {
    try {
        const weatherData = await fetchWithRetry(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        
        console.log('Weather data loaded successfully:', weatherData);
        return weatherData;
        
    } catch (error) {
        console.error('All weather fetch attempts failed:', error);
        throw error;
    }
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load weather data
        await fetchCurrentWeather();
        await fetchWeatherForecast();
        
        // Load game reserves data
        await loadGameReservesData();
        
        console.log('Application initialized successfully');
        
    } catch (error) {
        console.error('Application initialization failed:', error);
    }
});