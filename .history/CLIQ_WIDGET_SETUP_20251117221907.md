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