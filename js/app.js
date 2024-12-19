const weatherService = new WeatherService();
const mapService = new MapService();
const notificationService = new NotificationService();
const userService = new UserService();

async function init() {
    const defaultCity = 'New York';
    await updateWeather(defaultCity);
    notificationService.requestPermission();

    const body = document.body;
    const overlay = document.getElementById('weather-overlay');
    body.style.backgroundImage = "url('images/default-background.jpg')";
    overlay.style.backgroundImage = "none";
}

async function updateWeather(city) {
    try {
        const currentWeather = await weatherService.getCurrentWeather(city);
        const forecast = await weatherService.getForecast(city);

        displayCurrentWeather(currentWeather);
        displayForecast(forecast);
        mapService.initMap(currentWeather.coord.lat, currentWeather.coord.lon);
        mapService.addMarker(currentWeather.coord.lat, currentWeather.coord.lon, city);

        updateBackground(currentWeather.weather[0].main);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please check the city and try again.');
    }
}

async function updateWeatherByCoords(lat, lon) {
    try {
        const currentWeather = await weatherService.getWeatherByCoords(lat, lon);
        const forecast = await weatherService.getForecast(currentWeather.name);

        displayCurrentWeather(currentWeather);
        displayForecast(forecast);
        mapService.initMap(currentWeather.coord.lat, currentWeather.coord.lon);
        mapService.addMarker(currentWeather.coord.lat, currentWeather.coord.lon, currentWeather.name);

        updateBackground(currentWeather.weather[0].main);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please check the location and try again.');
    }
}

function displayCurrentWeather(weather) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h3>${weather.name}</h3>
        <p>Temperature: ${weather.main.temp}°C</p>
        <p>Condition: ${weather.weather[0].description}</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        <p>Wind: ${weather.wind.speed} m/s</p>
    `;
}

function displayForecast(forecast) {
    const forecastInfo = document.getElementById('forecast-info');
    forecastInfo.innerHTML = '<h3>Forecast for the next few days</h3>';
    forecast.list.slice(0, 40).forEach((item, index) => {
        if (index % 8 === 0) { 
            forecastInfo.innerHTML += `
                <p>${new Date(item.dt * 1000).toLocaleDateString()} ${new Date(item.dt * 1000).toLocaleTimeString()}: ${item.main.temp}°C, ${item.weather[0].description}</p>
            `;
        }
    });
}

function updateBackground(condition) {
    const body = document.body;
    const overlay = document.getElementById('weather-overlay');

    if (!condition) { 
        body.style.backgroundImage = "url('images/default-background.jpg')";
        overlay.style.backgroundImage = "none";
        return;
    }

    switch (condition) {
        case 'Clear':
            body.style.backgroundImage = "url('images/sunny-background.jpg')";
            overlay.style.backgroundImage = "url('images/sunny_overlay.png')";
            break;
        case 'Clouds':
            body.style.backgroundImage = "url('images/cloudy-background.jpg')";
            overlay.style.backgroundImage = "url('images/cloudy_overlay.png')";
            break;
        case 'Rain':
            body.style.backgroundImage = "url('images/rainy-background.jpg')";
            overlay.style.backgroundImage = "url('images/rainy_overlay.png')";
            break;
        case 'Wind':
            body.style.backgroundImage = "url('images/windy-background.jpg')";
            overlay.style.backgroundImage = "url('images/windy_overlay.png')";
            break;
        default:
            body.style.backgroundImage = "url('images/default-background.jpg')";
            overlay.style.backgroundImage = "none";
    }
}

document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('location-search').value;
    updateWeather(city);
});

document.getElementById('use-current-location').addEventListener('click', async function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            await updateWeatherByCoords(position.coords.latitude, position.coords.longitude);
        }, (error) => {
            console.error('Error getting location:', error);
            alert('Error getting your location. Please check that location services are enabled and try again.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

init();
