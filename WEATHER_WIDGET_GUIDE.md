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
   - Get your own API key from the dashboard

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
   // Line 7: Your API Key (replace with your own)
   apiKey = "YOUR_API_KEY_HERE";
   
   // Line 8: API URL
   apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + city + "&aqi=yes";
   ```

3. **Widget Arguments:**
   - `city` (optional) - Default: "London"
   - `tab` (optional) - Default: "current"

### Step 3: Create Button Handler Functions

The widget uses several functions for interactivity. Create each function:

#### Function 1: `refreshWeather`
1. Go to **Functions** section in Cliq
2. Click **"Create Function"**
3. Name: `refreshWeather`
4. Type: **Button Function**
5. Paste the corresponding code from `deluge_button_handlers.txt` (lines 1-17)

#### Function 2: `searchCity`
1. Create new function
2. Name: `searchCity`
3. Type: **Button Function**
4. Paste code from `deluge_button_handlers.txt` (lines 19-28)

#### Function 3: `goToTab`
1. Create new function
2. Name: `goToTab`
3. Type: **Button Function**
4. Paste code from `deluge_button_handlers.txt` (lines 30-41)

#### Function 4: `quickSearch`
1. Create new function
2. Name: `quickSearch`
3. Type: **Button Function**
4. Paste code from `deluge_button_handlers.txt` (lines 43-55)

#### Function 5: `searchWeatherByCity`
1. Create new function
2. Name: `searchWeatherByCity`
3. Type: **Form Function**
4. Paste code from `deluge_button_handlers.txt` (lines 57-76)

### Step 4: Test the Widget

1. **Save all functions and the widget handler**

2. **Test in Cliq:**
   - Go to any chat or channel
   - Type `/widget weather-widget`
   - Or click on **"Widgets"** in the sidebar
   - Select your **"Weather Dashboard"** widget

3. **Expected Behavior:**
   - Tab 1 (🌤️ Current Weather): Shows weather card with temperature, conditions, and quick stats
   - Tab 2 (📊 Details): Shows detailed weather information in organized sections
   - Tab 3 (🔍 Search): Form to search any city + quick access buttons

### Step 5: Add Widget to Sidebar (Optional)

1. **Pin Widget for Easy Access:**
   - Open the widget
   - Click the **⋮** (three dots) menu
   - Select **"Pin to Sidebar"**

2. **Add to Home Screen:**
   - Go to Cliq Home
   - Click **"Add Widget"**
   - Select your Weather Dashboard
   - Position as desired

---

## 🎨 Widget UI Structure

### Tab 1: Current Weather
```
┌─────────────────────────────────┐
│ 📍 London, United Kingdom       │
├─────────────────────────────────┤
│ [Weather Icon] Partly Cloudy    │
│ Temperature: 15°C (59°F)        │
│ Feels Like: 13°C                │
├─────────────────────────────────┤
│ 💧 Humidity      │ 65%          │
│ 🌬️ Wind Speed   │ 20 km/h      │
│ 🧭 Wind Dir      │ NW           │
│ 🔬 Pressure      │ 1013 mb      │
│ 👁️ Visibility   │ 10 km        │
│ ☀️ UV Index     │ 3            │
├─────────────────────────────────┤
│  [🔄 Refresh]  [🔍 Search City] │
└─────────────────────────────────┘
```

### Tab 2: Details
- Temperature Details section
- Wind Information section
- Atmospheric Conditions section
- Air Quality Index (if available)

### Tab 3: Search
- Search form (text input)
- Popular cities quick buttons
- Grid of city buttons (London, New York, Tokyo, Mumbai, Paris, Sydney)

---

## 🔧 Customization Options

### 1. Change Default City
```deluge
// Line 7 in weather widget handler
city = arguments.get("city");
if(city == null || city == "") {
    city = "Mumbai"; // Change to your preferred default city
}
```

### 2. Add More Quick Access Cities
```deluge
// Around line 320 in the search tab section
searchElements.add({
    "type": "buttons",
    "buttons": {
        {
            "label": "🇩🇪 Berlin",
            "type": "invoke.function",
            "name": "quickSearch",
            "id": "berlin_btn",
            "data": {"city": "Berlin"}
        },
        {
            "label": "🇨🇦 Toronto",
            "type": "invoke.function",
            "name": "quickSearch",
            "id": "toronto_btn",
            "data": {"city": "Toronto"}
        }
    }
});
```

### 3. Change Temperature Unit (Celsius/Fahrenheit)
```deluge
// Modify around line 118
mainCardElements.add({
    "type": "text",
    "text": "**Temperature:** " + tempF + "°F (" + tempC + "°C)" // Swap order
});
```

### 4. Customize Card Theme
Available themes:
- `"modern-inline"` (default)
- `"modern-inline-light"`
- `"modern-inline-dark"`

```deluge
// Line 111
tempCard = {
    "type": "card",
    "title": weatherDesc,
    "thumbnail": weatherIcon,
    "theme": "modern-inline-dark" // Change theme here
};
```

---

## 🔗 Integration with Bot (Optional)

Create a bot that works alongside the widget:

### Bot Message Handler
```deluge
response = Map();
input = message.get("content").get("text").toLowerCase();

if(input.contains("weather")) {
    // Extract city from message
    city = "London"; // Default
    
    if(input.contains("in ") || input.contains("for ")) {
        // Parse city name (simple implementation)
        parts = input.split(" ");
        city = parts.get(parts.size() - 1);
    }
    
    // Send widget link
    widgetLink = {
        "type": "applet",
        "id": "weather-widget",
        "params": {"city": city}
    };
    
    response.put("text", "🌤️ Here's the weather for " + city);
    response.put("card", widgetLink);
}

return response;
```

### Bot Commands
Create a slash command `/weather [city]`:

```deluge
response = Map();
city = arguments.get("city");

if(city == null || city == "") {
    city = "London";
}

// Open widget with specified city
widgetLink = {
    "type": "applet",
    "id": "weather-widget",
    "params": {"city": city}
};

response.put("text", "☀️ Opening weather dashboard for " + city);
response.put("card", widgetLink);

return response;
```

---

## 📱 Mobile View

The widget is automatically responsive and works on:
- ✅ Zoho Cliq Desktop App
- ✅ Zoho Cliq Web App
- ✅ Zoho Cliq Mobile App (iOS/Android)

Mobile-specific features:
- Cards stack vertically
- Buttons are touch-friendly
- Forms use native mobile inputs

---

## 🐛 Troubleshooting

### Issue 1: Widget Not Loading
**Problem:** White screen or loading forever

**Solution:**
1. Check API key is correct
2. Verify internet connectivity
3. Check Deluge syntax errors in console
4. Try with default city "London" first

### Issue 2: "City Not Found" Error
**Problem:** Error when searching for a city

**Solution:**
1. Check city name spelling
2. Try adding country (e.g., "Paris, France")
3. Use larger cities first
4. Check API response in logs

### Issue 3: Buttons Not Working
**Problem:** Clicking buttons does nothing

**Solution:**
1. Verify all button functions are created
2. Check function names match exactly
3. Ensure functions are saved and active
4. Check function type (Button Function vs Form Function)

### Issue 4: No Air Quality Data
**Problem:** Air quality section not showing

**Solution:**
- Air quality data is not available for all locations
- The code handles this gracefully (shows only if available)
- This is expected behavior

### Issue 5: Weather Icon Not Showing
**Problem:** Weather condition icon is missing

**Solution:**
1. WeatherAPI returns icon URLs
2. Check if `weatherIcon` variable has value
3. Ensure card type supports thumbnails
4. Try different card themes

---

## 📊 API Rate Limits

**WeatherAPI.com Free Tier:**
- **1 million calls/month** (≈ 33,000/day)
- **Real-time weather:** Current conditions
- **Air Quality Index:** Included
- **No credit card required**

**Monitoring Usage:**
1. Go to WeatherAPI.com dashboard
2. Check "Usage" section
3. Monitor daily/monthly calls

**Tips to Stay Within Limits:**
- Cache weather data (refresh every 15-30 minutes)
- Implement rate limiting in functions
- Use default cities smartly

---

## 🚀 Enhancement Ideas

### 1. Add Weather Forecast
Modify API call to include forecast:
```deluge
apiUrl = "https://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=" + city + "&days=3";
```

### 2. Add Weather Alerts
```deluge
// Add alerts tab
if(activeTab == "alerts") {
    alerts = response.get("alerts");
    // Display alerts
}
```

### 3. Store Favorite Cities
Use Cliq Database to store user's favorite cities:
```deluge
// Create database: favorite_cities
// Fields: user_email (text), city_name (text)

// Save favorite
row = Map();
row.put("user_email", user.get("email"));
row.put("city_name", city);
zoho.cliq.createRecord("favorite_cities", row);
```

### 4. Daily Weather Notifications
Create a scheduler:
```deluge
// Run daily at 8:00 AM
// Fetch weather for favorite cities
// Send notification to users
```

### 5. Weather Comparison
Compare weather between multiple cities side-by-side.

### 6. Historical Weather
Add tab showing weather history/trends.

---

## 📁 File Structure

```
zoho/
├── .env                          # Your API key
├── deluge_weather_widget.txt     # Main widget handler code
├── deluge_button_handlers.txt    # Button function handlers
└── WEATHER_WIDGET_GUIDE.md      # This guide
```

---

## ✅ Testing Checklist

Before submitting or going live:

- [ ] Widget loads successfully
- [ ] Default city (London) works
- [ ] All three tabs display correctly
- [ ] Search form accepts input
- [ ] Quick city buttons work
- [ ] Refresh button updates data
- [ ] Weather data displays accurately
- [ ] Fields show correct values
- [ ] Error handling works (try "InvalidCity123")
- [ ] Mobile view is responsive
- [ ] All buttons are clickable
- [ ] Tab navigation works smoothly
- [ ] Air quality shows (if available)
- [ ] Weather icon displays
- [ ] Temperature units are correct

---

## 🎓 For CliqTrix Contest

### How This Widget Qualifies:

✅ **Original Work:** Custom-built weather widget
✅ **Has Widget:** Multi-tab widget with modern UI
✅ **Productivity:** Helps teams check weather without leaving Cliq
✅ **Uses Cliq Platform:** Built with Deluge, uses Cliq widget framework
✅ **Third-party Integration:** WeatherAPI.com integration
✅ **User-Friendly:** Intuitive UI with cards and forms

### Submission Materials:

1. **Demo Video:** Show widget in action
2. **Screenshots:** Current weather, Details tab, Search tab
3. **Description:** "Real-time weather dashboard for Zoho Cliq teams with modern card-based UI, city search, and detailed weather metrics"
4. **Use Case:** "Keep teams informed about weather conditions without leaving Cliq, useful for field teams, delivery teams, or anyone planning outdoor activities"

---

## 📞 Support

For issues or questions:
- **Zoho Cliq Docs:** https://www.zoho.com/cliq/help/
- **WeatherAPI Docs:** https://www.weatherapi.com/docs/
- **Contest Support:** contact@cliqtrix.com

---

## 📝 License & Credits

- **Weather Data:** Powered by WeatherAPI.com
- **Platform:** Zoho Cliq
- **Language:** Deluge Script
- **Created for:** CliqTrix 2025 Contest

---

**Version:** 1.0.0  
**Last Updated:** November 18, 2025  
**Author:** Your Name/Team

---

## 🎉 You're All Set!

Your weather widget is now ready to use in Zoho Cliq. Copy the code files, follow the steps above, and start tracking weather directly in your team's collaboration space!

**Good luck with CliqTrix 2025! 🏆**
