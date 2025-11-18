# 🌤️ Weather Widget for Zoho Cliq - Implementation Guide

## Overview
This weather widget provides a beautiful, card-based UI to display real-time weather information from WeatherAPI.com directly in Zoho Cliq.

## Features
✅ Modern card-based UI with three tabs
✅ Real-time weather data with temperature, humidity, wind, etc.
✅ Air quality index information
✅ City search functionality
✅ Quick access buttons for popular cities
✅ Detailed weather information view
✅ Error handling with user-friendly messages

---

## 📋 Prerequisites

1. **Zoho Cliq Account** (Free or Paid)
2. **Weather API Key** from WeatherAPI.com
   - Sign up at: https://www.weatherapi.com/
   - Free tier: 1 million calls/month
   - Your API Key: `ccd01b43fa374e2eace170814251711`

---

## 🚀 Step-by-Step Implementation

### Step 1: Create a New Widget in Zoho Cliq

1. **Login to Zoho Cliq**
   - Go to: https://cliq.zoho.com/

2. **Navigate to Bot & Tools**
   - Click on your profile picture (top right)
   - Select **"Bots & Tools"**
   - Click on **"Widgets"** in the left sidebar

3. **Create New Widget**
   - Click **"Create Widget"** button
   - Fill in details:
     - **Widget Name:** `weather-widget`
     - **Display Name:** `Weather Dashboard`
     - **Description:** `Real-time weather information with modern UI`

4. **Choose Widget Type**
   - Select **"Sections View"** (for custom UI with cards)

### Step 2: Configure Widget Handler

1. **In the Widget Handler section**, paste the code from `deluge_weather_widget.txt`

2. **Important Code Sections:**
   ```deluge
   // Line 7: Your API Key (already configured)
   apiKey = "ccd01b43fa374e2eace170814251711";
   
   // Line 8: API URL
   apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + city + "&aqi=yes";
   ```

3. **Widget Arguments:**
   - `city` (optional) - Default: "London"