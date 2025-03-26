// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption')

const myKey = "48f7fa8f7c68b67d0092de51315e2fa6";
const myLat = "49.75";
const myLong = "6.63";

// Use backticks for proper template literal formatting
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Testing only
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    console.log('hello');
    if (myTown) {
        myTown.innerHTML = data.name;
    } else {
        console.log("Element with ID 'my-town' not found.");
    }
}

// Call the function to fetch data
apiFetch();


