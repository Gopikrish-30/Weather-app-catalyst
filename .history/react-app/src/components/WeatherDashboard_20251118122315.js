import React, { useState } from 'react';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        ? 'http://localhost:3001/server/widgettest_function' // Catalyst local development server
        : '/server/widgettest_function'; // Production Catalyst function URL (relative path)
      
      // Call Catalyst function endpoint
      const response = await fetch(`${apiBaseUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city })
      });
      
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