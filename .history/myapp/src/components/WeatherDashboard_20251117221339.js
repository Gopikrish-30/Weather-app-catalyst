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
      // For now, use mock data
      // TODO: Replace with actual API call to Catalyst function