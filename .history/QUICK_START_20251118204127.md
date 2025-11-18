# 🚀 Quick Start - Weather Widget for Zoho Cliq

## Copy-Paste Checklist

### ✅ Step 1: Create Widget
1. Go to Zoho Cliq → Profile → Bots & Tools → Widgets
2. Click "Create Widget"
3. Name: `weather-widget`
4. Display Name: `Weather Dashboard`
5. Copy entire content from `deluge_weather_widget.txt` → Paste in Widget Handler
6. Save

### ✅ Step 2: Create Functions

#### Function: refreshWeather
```deluge
response = Map();
city = arguments.get("city");
if(city == null || city == "") {
    city = "London";
}
response.put("type", "invoke.function");
response.put("name", "weatherWidget");
response.put("data", {"city": city, "tab": "current"});
return response;
```

#### Function: searchCity
```deluge
response = Map();
response.put("type", "invoke.function");
response.put("name", "weatherWidget");
response.put("data", {"tab": "search"});
return response;
```

#### Function: goToTab
```deluge
response = Map();
targetTab = target.get("data").get("tab");
city = arguments.get("city");
response.put("type", "invoke.function");
response.put("name", "weatherWidget");
response.put("data", {"city": city, "tab": targetTab});
return response;
```

#### Function: quickSearch
```deluge
response = Map();
buttonData = target.get("data");
selectedCity = buttonData.get("city");
response.put("type", "invoke.function");
response.put("name", "weatherWidget");
response.put("data", {"city": selectedCity, "tab": "current"});
return response;
```

#### Function: searchWeatherByCity
```deluge
response = Map();
formValues = form.get("values");
cityName = formValues.get("cityName");
if(cityName != null && cityName != "") {
    response.put("type", "invoke.function");
    response.put("name", "weatherWidget");
    response.put("data", {"city": cityName, "tab": "current"});
} else {
    response.put("type", "banner");
    response.put("text", "⚠️ Please enter a city name");
}
return response;
```

### ✅ Step 3: Test
1. In any Cliq chat, type: `/widget weather-widget`
2. Or go to Widgets sidebar → Select "Weather Dashboard"

---

## 🎯 What You Get

### Tab 1: Current Weather
- Location with country
- Weather icon and condition
- Temperature (°C and °F)
- Feels like temperature
- 6 quick stats: Humidity, Wind Speed, Wind Direction, Pressure, Visibility, UV Index
- Refresh and Search buttons

### Tab 2: Details
- Detailed temperature information
- Wind data
- Atmospheric conditions
- Air quality index (when available)

### Tab 3: Search
- Search form for any city
- Quick buttons for: London, New York, Tokyo, Mumbai, Paris, Sydney

---

## 📝 Your API Key (Already Configured)
```
WEATHER_API_KEY=ccd01b43fa374e2eace170814251711
```

---

## 🎨 Customization Quick Tips

**Change default city:**
Line 7 in widget handler: `city = "Mumbai";`

**Add more quick cities:**
Copy-paste button block in search tab, change city name

**Switch to Fahrenheit first:**
Swap tempF and tempC in temperature display

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Widget not loading | Check API key, verify internet |
| Buttons not working | Ensure all 5 functions are created |
| City not found | Check spelling, try larger cities |
| No air quality data | Normal - not available for all locations |

---

## 🏆 For CliqTrix Contest

**Category:** Productivity  
**Platform:** Zoho Cliq Extension  
**Type:** Widget with API Integration  
**Tech:** Deluge Script + WeatherAPI.com  

**Pitch:** "Weather Dashboard brings real-time weather data directly into Zoho Cliq with a beautiful card-based UI, helping teams stay informed without leaving their workspace."

---

## ✨ Features to Highlight

✅ Modern card-based UI  
✅ 3-tab navigation  
✅ Real-time weather data  
✅ City search functionality  
✅ Quick access to popular cities  
✅ Detailed weather metrics  
✅ Air quality information  
✅ Mobile responsive  
✅ Error handling  

---

**Total Setup Time:** ~15 minutes  
**Lines of Code:** ~400+  
**API Cost:** Free (1M calls/month)  

**Ready to deploy!** 🚀
