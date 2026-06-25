import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/v1',
    headers: { 'Content-Type': 'application/json' }
});

export function getWeather(city) {
    return apiClient.get(`/weather/current/${city}`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export function getForecast(city) {
    return apiClient.get(`/weather/forecast/${city}`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}