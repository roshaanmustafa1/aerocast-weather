import express from 'express';
import { getWeatherByCity, getForecastByCity } from '../controller/weather.controller.js';

const router = express.Router();

router.get('/current/:city', getWeatherByCity); // Path change kiya better REST convention ke liye
router.get('/forecast/:city', getForecastByCity); // NAYA ROUTE

export default router;