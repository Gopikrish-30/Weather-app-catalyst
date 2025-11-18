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

/**
 * Main handler function - supports both HTTP and Event modes
 */
module.exports = async (eventObj, context) => {
	try {
		// Handle HTTP requests (Advanced I/O mode)
		if (eventObj.url) {
			const url = require('url');
			const parsedUrl = url.parse(eventObj.url, true);
			const query = parsedUrl.query;
			const city = query.city || 'London';
			
			// Fetch and format weather data
			const weatherData = await fetchWeatherData(city);
			const formattedData = formatWeatherData(weatherData);
			
			return {
				statusCode: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({
					success: true,
					data: formattedData
				})
			};
		}
		
		// Handle Cliq events (Event Function mode)
		const city = eventObj.arguments?.city || eventObj.params?.city || 'London';
		const weatherData = await fetchWeatherData(city);
		const formattedData = formatWeatherData(weatherData);
		
		return {
			success: true,
			data: formattedData,
			message: `Weather for ${formattedData.city}, ${formattedData.country}`
		};
		
	} catch (error) {
		console.error('Weather API Error:', error);
		
		// HTTP error response
		if (eventObj.url) {
			return {
				statusCode: error.statusCode || 500,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					success: false,
					error: error.message || 'Failed to fetch weather data'
				})
			};
		}
		
		// Cliq error response
		return {
			success: false,
			error: error.message || 'Failed to fetch weather data'
		};
	}
};
