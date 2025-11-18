import React, { useState } from 'react';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data for testing frontend
  const mockWeatherData = {
    city: 'London',
    country: 'GB',
    temperature: 15,
    feels_like: 13,
    humidity: 72,
    pressure: 1013,
    wind_speed: 5.5,
    description: 'Partly cloudy',
    icon: '02d',
    timestamp: new Date().toLocaleString()
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Determine API endpoint based on environment
      const isDevelopment = process.env.NODE_ENV === 'development';
      const apiBaseUrl = isDevelopment 
        ? 'http://localhost:9000' // Catalyst local development server
        : ''; // Production Catalyst function URL (relative path)
      
      // Call Catalyst function endpoint
      const response = await fetch(`${apiBaseUrl}/weather?city=${encodeURIComponent(city)}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setWeather(result.data);
      } else {
        setError(result.error || 'Failed to fetch weather data');
      }
      
      setLoading(false);
      
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    // Weather icon mapping (using emoji for now)
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[iconCode] || '🌤️';
  };

  return (
    <div className="weather-dashboard">
      <div className="weather-container">
        <h1 className="dashboard-title">
          🌤️ Weather Dashboard
        </h1>
        <p className="dashboard-subtitle">
          Get real-time weather information for any city
        </p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name (e.g., London, New York)"
              className="search-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={loading}
            >
              {loading ? '🔄' : '🔍'} Search
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-card">
            <div className="weather-header">
              <h2 className="city-name">
                {weather.city}, {weather.country}
              </h2>
              <p className="timestamp">
                Last updated: {weather.timestamp}
              </p>
            </div>

            <div className="weather-main">
              <div className="weather-icon-large">
                {getWeatherIcon(weather.icon)}
              </div>
              <div className="weather-temp">
                <h1 className="temperature">
                  {Math.round(weather.temperature)}°C
                </h1>
                <p className="description">{weather.description}</p>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-icon">🌡️</span>
                <div className="detail-info">
                  <p className="detail-label">Feels Like</p>
                  <p className="detail-value">{Math.round(weather.feels_like)}°C</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <div className="detail-info">
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">{weather.humidity}%</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <div className="detail-info">
                  <p className="detail-label">Wind Speed</p>
                  <p className="detail-value">{weather.wind_speed} m/s</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">📊</span>
                <div className="detail-info">
                  <p className="detail-label">Pressure</p>
                  <p className="detail-value">{weather.pressure} hPa</p>
                </div>
              </div>
            </div>

            <div className="weather-footer">
              <p className="api-credit">
                Powered by OpenWeather API
              </p>
            </div>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="welcome-message">
            <div className="welcome-icon">🌍</div>
            <h3>Welcome to Weather Dashboard!</h3>
            <p>Enter a city name above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
