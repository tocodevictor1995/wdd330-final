class WeatherService {
    constructor() {
        this.apiKey = '3d5d55bf796a079592d2c6887526934e';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }

    async getCurrentWeather(city) {
        const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        return await response.json();
    }

    async getForecast(city) {
        const url = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        return await response.json();
    }

    async getWeatherByCoords(lat, lon) {
        const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        return await response.json();
    }
}
