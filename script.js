const container = document.querySelector('.container');
const search = document.getElementById('btnSearch');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = 'befd984de4d3c050671d4eb935e6c660';

    // Get the city name and check if it's provided
    const city = document.getElementById('city').value.toLowerCase();
    if (!city) {
        console.log('Please enter a city name');
        return;
    }

    // Create the API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

    // Fetch data from the API
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');  // Handle cases like invalid city
            }
            return response.json();
        })
        .then((data) => displayData(data))
        .catch((error) => console.log(error.message));  // Log the error
});

// Display weather data
const displayData = (data) => {
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    // Update weather icon based on conditions
    switch (data.weather[0].main) {
        case 'Clear':
            image.src = 'image/clear.png';
            break;
        case 'Rain':
            image.src = 'image/rain.png';
            break;
        case 'Snow':
            image.src = 'image/snow.png';
            break;
        case 'Clouds':
            image.src = 'image/cloud.png';
            break;
        case 'Mist':
        case 'Haze':
            image.src = 'image/mist.png';
            break;
        default:
            image.src = 'image/cloud.png';
    }

    // Update weather details
    temperature.innerText = `${data.main.temp}Â°C`;
    description.innerText = data.weather[0].description;
    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed} km/h`;
};