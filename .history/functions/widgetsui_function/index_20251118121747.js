'use strict';

const https = require('https');

// WeatherAPI.com Configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo';
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';

/**
 * Fetch weather data from WeatherAPI.com
 */
function fetchWeatherData(city) {
	return new Promise((resolve, reject) => {
		const apiUrl = `${WEATHER_API_BASE_URL}?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
		
		https.get(apiUrl, (response) => {
			let data = '';
			response.on('data', (chunk) => { data += chunk; });
			response.on('end', () => {
				try {
					const weatherData = JSON.parse(data);
					if (response.statusCode === 200) {
						resolve(weatherData);
					} else {
						reject({ statusCode: response.statusCode, message: weatherData.message || 'Failed to fetch weather data' });
					}
				} catch (error) {
					reject({ statusCode: 500, message: 'Failed to parse weather data' });
				}
			});
		}).on('error', (error) => {
			reject({ statusCode: 500, message: `API request failed: ${error.message}` });
		});
	});
}

/**
 * Format weather data
 */
function formatWeatherData(data) {
	return {
		city: data.location.name,
		country: data.location.country,
		temperature: data.current.temp_c,
		feels_like: data.current.feelslike_c,
		humidity: data.current.humidity,
		pressure: data.current.pressure_mb,
		wind_speed: data.current.wind_kph / 3.6,
		description: data.current.condition.text,
		icon: data.current.condition.code.toString(),
		timestamp: new Date().toLocaleString()
	};
}