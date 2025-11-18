'use strict';

const { IncomingMessage, ServerResponse } = require("http");
const https = require('https');
const url = require('url');

// WeatherAPI.com Configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo'; // Set via Catalyst environment variables
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';

/**
 * Fetch weather data from WeatherAPI.com
 * @param {string} city - City name
 * @returns {Promise<object>} Weather data
 */
function fetchWeatherData(city) {
	return new Promise((resolve, reject) => {
		const apiUrl = `${WEATHER_API_BASE_URL}?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
		
		https.get(apiUrl, (response) => {
			let data = '';
			
			response.on('data', (chunk) => {
				data += chunk;
			});
			
			response.on('end', () => {
				try {
					const weatherData = JSON.parse(data);
					
					if (response.statusCode === 200) {
						resolve(weatherData);
					} else {
						reject({
							statusCode: response.statusCode,
							message: weatherData.message || 'Failed to fetch weather data'
						});
					}
				} catch (error) {
					reject({
						statusCode: 500,
						message: 'Failed to parse weather data'
					});
				}
			});
		}).on('error', (error) => {
			reject({
				statusCode: 500,
				message: `API request failed: ${error.message}`
			});
		});
	});
}

/**
 * Format weather data for frontend
 * @param {object} data - Raw WeatherAPI.com response
 * @returns {object} Formatted weather data
 */
function formatWeatherData(data) {
	return {
		city: data.location.name,
		country: data.location.country,
		temperature: data.current.temp_c,
		feels_like: data.current.feelslike_c,
		humidity: data.current.humidity,
		pressure: data.current.pressure_mb,
		wind_speed: data.current.wind_kph / 3.6, // Convert km/h to m/s
		description: data.current.condition.text,
		icon: data.current.condition.code.toString(),
		timestamp: new Date().toLocaleString()
	};
}

/**
 * Enable CORS for development
 * @param {ServerResponse} res 
 */
function setCorsHeaders(res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Main handler function
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
module.exports = async (req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;
	const query = parsedUrl.query;
	
	// Enable CORS
	setCorsHeaders(res);
	
	// Handle OPTIONS request (preflight)
	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}
	
	// Route: GET /weather?city={cityName}
	if (pathname === '/weather' && req.method === 'GET') {
		const city = query.city;
		
		// Validate city parameter
		if (!city || city.trim() === '') {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({
				success: false,
				error: 'City parameter is required'
			}));
			return;
		}
		
		try {
			// Fetch weather data from WeatherAPI.com
			const weatherData = await fetchWeatherData(city);
			
			// Format and send response
			const formattedData = formatWeatherData(weatherData);
			
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({
				success: true,
				data: formattedData
			}));
			
		} catch (error) {
			console.error('Weather API Error:', error);
			
			res.writeHead(error.statusCode || 500, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({
				success: false,
				error: error.message || 'Failed to fetch weather data'
			}));
		}
		return;
	}
	
	// Route: GET / (Root - Health check & Info)
	if (pathname === '/' && req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({
			service: 'Weather Dashboard API',
			version: '1.0.0',
			endpoints: {
				weather: '/weather?city={cityName}'
			},
			status: 'running',
			timestamp: new Date().toISOString()
		}));
		return;
	}
	
	// 404 - Not Found
	res.writeHead(404, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({
		success: false,
		error: 'Endpoint not found',
		availableEndpoints: [
			'GET /',
			'GET /weather?city={cityName}'
		]
	}));
};
