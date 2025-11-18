'use strict';

const { IncomingMessage, ServerResponse } = require("http");
const https = require('https');
const url = require('url');

// OpenWeather API Configuration
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'demo'; // Set via Catalyst environment variables
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch weather data from OpenWeather API
 * @param {string} city - City name
 * @returns {Promise<object>} Weather data
 */
function fetchWeatherData(city) {
	return new Promise((resolve, reject) => {
		const apiUrl = `${OPENWEATHER_BASE_URL}?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
		
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
 * @param {object} data - Raw OpenWeather API response
 * @returns {object} Formatted weather data
 */
function formatWeatherData(data) {
	return {
		city: data.name,
		country: data.sys.country,
		temperature: data.main.temp,
		feels_like: data.main.feels_like,
		humidity: data.main.humidity,
		pressure: data.main.pressure,
		wind_speed: data.wind.speed,
		description: data.weather[0].description,
		icon: data.weather[0].icon,
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
			// Fetch weather data from OpenWeather API
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
