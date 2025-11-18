// Quick test for WeatherAPI.com
const https = require('https');

const API_KEY = 'ccd01b43fa374e2eace170814251711';
const city = 'London';

console.log('🌤️  Testing WeatherAPI.com...\n');

const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const weather = JSON.parse(data);
            
            if (res.statusCode === 200) {
                console.log('✅ API Key is VALID!\n');
                console.log('📍 City:', weather.location.name, ',', weather.location.country);
                console.log('🌡️  Temperature:', Math.round(weather.current.temp_c), '°C');
                console.log('💧 Humidity:', weather.current.humidity, '%');
                console.log('💨 Wind Speed:', Math.round(weather.current.wind_kph), 'km/h');
                console.log('📝 Description:', weather.current.condition.text);
                console.log('\n✅ Your API is working! Backend will work correctly.\n');
            } else {
                console.log('❌ API Error:', weather.error?.message || 'Unknown error');
                console.log('Status Code:', res.statusCode);
                console.log('\nPlease check your API key at: https://www.weatherapi.com\n');
            }
        } catch (error) {
            console.log('❌ Failed to parse response:', error.message);
            console.log('Response:', data);
        }
    });
}).on('error', (error) => {
    console.log('❌ Network Error:', error.message);
    console.log('\nPlease check your internet connection.\n');
});
