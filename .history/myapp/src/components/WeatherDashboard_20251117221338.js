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