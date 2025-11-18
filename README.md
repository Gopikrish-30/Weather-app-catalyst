# Weather App for Zoho Catalyst

A weather application built with Zoho Catalyst platform that provides real-time weather information with a modern UI.

## 🚀 Quick Setup

### Prerequisites
- Zoho Catalyst account
- Node.js (v14 or higher)
- WeatherAPI.com API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gopikrish-30/Weather-app-catalyst.git
   cd Weather-app-catalyst
   ```

2. **Configure Environment Variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your WeatherAPI key:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```
   
   Get your free API key from [WeatherAPI.com](https://www.weatherapi.com/) (1M calls/month free)

3. **Configure Catalyst**
   
   Copy the example Catalyst configuration:
   ```bash
   cp .catalystrc.example .catalystrc
   ```
   
   Update `.catalystrc` with your Catalyst project details (project ID, environment ID, etc.)

4. **Install Dependencies**
   ```bash
   cd functions/widgettest_function
   npm install
   ```

5. **Deploy to Catalyst**
   ```bash
   catalyst serve
   # or for deployment
   catalyst deploy
   ```

## 📁 Project Structure

```
Weather-app-catalyst/
├── functions/
│   └── widgettest_function/     # Backend function for weather API
├── react-app/                   # Frontend React application
├── myapp/                       # Alternative app configuration
├── deluge_weather_widget.txt    # Zoho Cliq widget code
├── deluge_button_handlers.txt   # Widget button handlers
├── .env.example                 # Environment variables template
├── .catalystrc.example          # Catalyst config template
└── catalyst.json.example        # Catalyst project config template

```

## 🔒 Security Notes

**Important:** Never commit sensitive files to the repository!

The following files are ignored by git (see `.gitignore`):
- `.env` - Contains API keys and secrets
- `.catalystrc` - Contains Catalyst project credentials
- `catalyst.json` - Contains project configuration
- `.history/` - IDE history files that may contain sensitive data

Always use the `.example` files as templates and create your own local configuration files.

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get started quickly with the widget
- [Weather Widget Guide](WEATHER_WIDGET_GUIDE.md) - Comprehensive widget implementation guide
- [Deployment Success](DEPLOYMENT_SUCCESS.md) - Deployment checklist and verification
- [CliqTrix Complete Guide](CLIQTRIX_COMPLETE_GUIDE.md) - Full platform integration guide

## 🌤️ Features

- Real-time weather data from WeatherAPI.com
- Modern card-based UI
- Multi-tab interface (Current Weather, Details, Search)
- City search functionality
- Quick access to popular cities
- Air quality index information
- Temperature in Celsius and Fahrenheit
- Wind, humidity, pressure, and visibility data
- Mobile responsive design

## 🛠️ Technologies

- **Platform:** Zoho Catalyst
- **Backend:** Node.js Catalyst Functions
- **Frontend:** React
- **Widget:** Zoho Cliq Deluge Script
- **Weather API:** WeatherAPI.com

## 📝 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For issues related to:
- **Zoho Catalyst:** [Catalyst Documentation](https://catalyst.zoho.com/help/)
- **Zoho Cliq:** [Cliq Documentation](https://www.zoho.com/cliq/help/)
- **WeatherAPI:** [WeatherAPI Docs](https://www.weatherapi.com/docs/)

---

**Note:** This is a demo application. Ensure you follow security best practices when deploying to production.
