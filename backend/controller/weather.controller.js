import { fetchWeatherFromExternalAPI, fetchForecastFromExternalAPI } from "../services/weather.service.js";

export function getWeatherByCity(req, res){
    const city = req.params.city;

    if (!city) {
        return res.status(400).json({message: "City is required"})
    }
    
    fetchWeatherFromExternalAPI(city)
        .then((data) => {
            res.status(200).json({ success: true, data: data });
        })
        .catch((error) => {
            res.status(500).json({ 
                success: false, 
                message: error.response?.data?.message || 'Failed to fetch weather data' 
            });
        });
    
}
    
export function getForecastByCity(req, res) {
    const city = req.params.city;

    if (!city) {
        return res.status(400).json({ success: false, message: 'City name is required' });
    }

    fetchForecastFromExternalAPI(city)
        .then((data) => {
            res.status(200).json({ success: true, data: data });
        })
        .catch((error) => {
            res.status(500).json({ 
                success: false, 
                message: error.response?.data?.message || 'Failed to fetch forecast data' 
            });
        });
}