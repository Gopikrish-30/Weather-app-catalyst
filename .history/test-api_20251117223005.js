// Quick test for Weather API
const https = require('https');

const API_KEY = 'f496c6178c8d7bccc504fb949cac4461';
const city = 'London';

console.log('🌤️  Testing OpenWeather API...\n');

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

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
                console.log('📍 City:', weather.name, ',', weather.sys.country);
                console.log('🌡️  Temperature:', Math.round(weather.main.temp), '°C');
                console.log('💧 Humidity:', weather.main.humidity, '%');
                console.log('💨 Wind Speed:', weather.wind.speed, 'm/s');
                console.log('📝 Description:', weather.weather[0].description);
                console.log('\n✅ Your API is working! Backend will work correctly.\n');
            } else {
                console.log('❌ API Error:', weather.message || 'Unknown error');
                console.log('Status Code:', res.statusCode);
                console.log('\nPlease check your API key at: https://openweathermap.org/api\n');
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
