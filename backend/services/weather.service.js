import axios from "axios";

export function fetchWeatherFromExternalAPI(city) {
    const url = `${process.env.WEATHER_BASE_URL}?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    return axios.get(url)
    .then(response => {
        return {
            city: response.data.name,
            temp: response.data.main.temp,
            feels_like: response.data.main.feels_like,
            temp_min: response.data.main.temp_min,
            temp_max: response.data.main.temp_max,
            description: response.data.weather[0].description,
            main: response.data.weather[0].main,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
        }
    });
}

export function fetchForecastFromExternalAPI(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    
    return axios.get(url)
        .then((response) => {
            const dailyData = response.data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
            const cleanForecast = dailyData.map(item => ({
                date: item.dt_txt.split(' ')[0],
                temperature: item.main.temp,
                feels_like: item.main.feels_like,
                temp_min: item.main.temp_min,
                temp_max: item.main.temp_max,
                humidity: item.main.humidity,
                wind_speed: item.wind.speed,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                main: item.weather[0].main
            }));

            return {
                city: response.data.city.name,
                forecast: cleanForecast
            };
        });
}