# Zoho Cliq Widget Handler for Weather Dashboard

## Widget Configuration

This file contains the Deluge code to create a Web View widget in Zoho Cliq that displays the Weather Dashboard React app.

## Setup Instructions

### 1. Create Widget in Zoho Cliq

1. Log in to Zoho Cliq
2. Go to **Profile → Bots & Tools → Widgets**
3. Click **"Create Widget"**
4. Configure:
   - **Widget Name**: Weather Dashboard
   - **Display Name**: Weather Dashboard
   - **Description**: Get real-time weather information for any city
   - **Widget Type**: Web View

### 2. Widget Handler Code (Deluge)

```deluge
// Weather Dashboard Widget Handler
// This creates a Web View widget that embeds the React app

response = Map();

// Get the Catalyst function URL
// Replace with your actual deployed Catalyst URL
catalystUrl = "https://your-catalyst-url.catalyst.zoho.com";

// Web View Configuration
webview = Map();
webview.put("type", "webview");
webview.put("url", catalystUrl);

// Optional: Add navigation buttons
buttons = list();

refreshButton = Map();
refreshButton.put("label", "Refresh");
refreshButton.put("type", "reload");
refreshButton.put("id", "refresh_weather");
buttons.add(refreshButton);

// Build widget response
tabs = list();
tab = Map();
tab.put("label", "Weather");
tab.put("id", "weather_tab");
tabs.add(tab);

sections = list();
section = Map();
section.put("id", 1);
section.put("elements", {webview});
sections.add(section);

response.put("type", "applet");
response.put("tabs", tabs);
response.put("active_tab", "weather_tab");
response.put("sections", sections);
response.put("footer", buttons);

return response;
```

### 3. Alternative: Simple Web View Widget

If you want a simpler approach without buttons:

```deluge
// Simple Weather Dashboard Widget
response = Map();

// Your deployed Catalyst app URL
appUrl = "https://your-catalyst-url.catalyst.zoho.com";

// Create web view element
webview = Map();
webview.put("type", "webview");
webview.put("url", appUrl);

// Build sections
elements = list();
elements.add(webview);

sections = list();
section = Map();
section.put("id", 1);
section.put("elements", elements);
sections.add(section);

// Return widget
response.put("type", "applet");
response.put("sections", sections);

return response;
```

## Deployment Steps

### Step 1: Get OpenWeather API Key

1. Visit: https://openweathermap.org/api
2. Sign up for free account
3. Get your API key from dashboard
4. Note: Free tier allows 60 calls/minute, 1,000,000 calls/month

### Step 2: Set Up Catalyst Environment Variables

1. Open Catalyst console
2. Navigate to your project
3. Go to **Settings → Environment Variables**
4. Add:
   - **Key**: `OPENWEATHER_API_KEY`
   - **Value**: Your API key from OpenWeather

### Step 3: Deploy Catalyst Function

```bash
# Navigate to project root
cd /c/Users/admin/Desktop/zoho

# Login to Catalyst (if not already logged in)
catalyst login

# Initialize project (if not done)
catalyst init

# Deploy the function
catalyst deploy
```

### Step 4: Test Catalyst Function

After deployment, test the endpoint:

```bash
# Get your Catalyst function URL from console
# Test health endpoint
curl https://your-function-url.catalyst.zoho.com/

# Test weather endpoint
curl "https://your-function-url.catalyst.zoho.com/weather?city=London"
```

Expected response:
```json
{
  "success": true,
  "data": {
    "city": "London",
    "country": "GB",
    "temperature": 15.2,
    "feels_like": 13.5,
    "humidity": 72,
    "pressure": 1013,
    "wind_speed": 5.5,
    "description": "partly cloudy",
    "icon": "02d",
    "timestamp": "11/17/2025, 10:30:00 AM"
  }
}
```

### Step 5: Update React App for Production

Update `package.json` to set the Catalyst URL:

```json
{
  "proxy": "https://your-catalyst-url.catalyst.zoho.com"
}
```

Or create a `.env.production` file:

```env
REACT_APP_API_URL=https://your-catalyst-url.catalyst.zoho.com
```

### Step 6: Build and Deploy React App

```bash
# Navigate to React app
cd myapp

# Build for production
npm run build

# The build files will be in myapp/build/
# Deploy these to Catalyst static hosting or your web server
```

### Step 7: Create Cliq Widget

1. Go to Zoho Cliq
2. Profile → Bots & Tools → Widgets → Create Widget
3. Paste the widget handler code above
4. Replace `your-catalyst-url` with your actual deployed URL
5. Save widget

### Step 8: Test in Cliq

1. Open widget in Cliq sidebar
2. Search for a city (e.g., "Tokyo")
3. Verify weather data displays correctly
4. Test error handling with invalid city names
5. Check mobile view in Cliq mobile app

## Widget Publishing (For Contest Submission)

### Create Extension Bundle

1. Go to **Profile → Bots & Tools → Extensions**
2. Click **"Create Extension"**
3. Configure:
   - **Name**: Weather Dashboard
   - **Description**: Real-time weather information widget for teams
   - **Category**: Productivity
   - **Access Level**: Organization
   
4. Add Components:
   - [x] Widget (Weather Dashboard)
   - [x] Functions (if using Catalyst)
   
5. Upload Extension Icon (512x512 PNG):
   - Create a weather-themed icon
   - Use tools like Canva, Figma, or Photoshop
   
6. Add Screenshots:
   - Widget in Cliq sidebar
   - Weather display for different cities
   - Mobile view
   - Error handling examples

### Extension Marketplace Listing

**Title**: Weather Dashboard - Real-time Weather Widget

**Tagline**: Get instant weather updates for any city worldwide, right in your Cliq workspace

**Description**:
```
Weather Dashboard brings real-time weather information directly into your Zoho Cliq workspace. 
Perfect for distributed teams working across different cities and time zones.

Features:
✨ Real-time weather data for any city worldwide
🌡️ Temperature, humidity, wind speed, and pressure
🎨 Beautiful, modern interface with weather icons
📱 Fully responsive - works on desktop and mobile
⚡ Fast and reliable OpenWeather API integration
🔄 Instant search with loading indicators
⚠️ Smart error handling

Ideal for:
- Remote teams checking weather across locations
- Travel planning and coordination
- Event planning with weather considerations
- Quick weather checks during team meetings

Simply search for any city name and get instant weather updates!
```

**Setup Instructions**:
```
1. Install the Weather Dashboard extension
2. Open the widget from Cliq sidebar
3. Enter any city name (e.g., "London", "Tokyo", "New York")
4. View real-time weather information

No configuration needed - works out of the box!
```

**Support Email**: your-email@example.com

**Privacy Policy**: 
- No user data is stored
- Only city names are sent to OpenWeather API
- No tracking or analytics

## Testing Checklist

Before submission, verify:

- [ ] Widget loads in Cliq sidebar
- [ ] Weather search works for multiple cities
- [ ] Error handling works (invalid city names)
- [ ] Loading states display correctly
- [ ] Weather data updates in real-time
- [ ] Mobile view works in Cliq app
- [ ] No console errors
- [ ] Performance is acceptable (<3 seconds response)
- [ ] CORS is properly configured
- [ ] API rate limits are respected

## Troubleshooting

### Widget Not Loading
- Check Catalyst function is deployed
- Verify URL in widget handler is correct
- Check CORS headers in function

### Weather Data Not Showing
- Verify OpenWeather API key is valid
- Check environment variables are set
- Test Catalyst endpoint directly

### CORS Errors
- Ensure `Access-Control-Allow-Origin` header is set
- Check browser console for specific errors
- Verify preflight OPTIONS requests are handled

### Performance Issues
- Implement caching for repeated city searches
- Add rate limiting to prevent API quota exhaustion
- Optimize React app bundle size

## Additional Features (Optional)

### Add Favorites
Store user's favorite cities in Cliq database:

```deluge
// Save favorite city
row = Map();
row.put("user_id", user.get("id"));
row.put("city", city_name);
zoho.cliq.createRecord("favorite_cities", row);
```

### Add Forecast
Extend to show 5-day forecast:

```javascript
// In Catalyst function
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
```

### Add Weather Alerts
Send notifications for severe weather:

```deluge
// In scheduler (daily check)
if(weather.alerts) {
    zoho.cliq.postToChannel("general", "⚠️ Weather Alert: " + alert.description);
}
```

## Resources

- OpenWeather API Docs: https://openweathermap.org/api
- Zoho Catalyst Docs: https://docs.catalyst.zoho.com/
- Zoho Cliq Widgets: https://www.zoho.com/cliq/help/platform/widgets.html
- CliqTrix Contest: https://www.cliqtrix.com/

## License

Created for CliqTrix 2025 Contest

---

**Good luck with your submission! 🎉**
