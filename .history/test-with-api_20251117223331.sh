#!/bin/bash
# Quick test script for Weather Dashboard

API_KEY="f496c6178c8d7bccc504fb949cac4461"

echo "🌤️  Testing Weather Dashboard Backend"
echo "======================================"
echo ""

# Test OpenWeather API directly
echo "1. Testing OpenWeather API directly..."
RESPONSE=$(curl -s "https://api.openweathermap.org/data/2.5/weather?q=London&appid=$API_KEY&units=metric")

if [[ $RESPONSE == *"\"cod\":200"* ]]; then
    echo "✅ OpenWeather API key is valid!"
    echo "   Sample: $(echo $RESPONSE | grep -o '"name":"[^"]*"' | head -1)"
else
    echo "❌ OpenWeather API key failed!"
    echo "   Response: $RESPONSE"
    exit 1
fi

echo ""
echo "2. Starting local Catalyst function..."
cd functions/widgetsui_function

# Start function in background
OPENWEATHER_API_KEY=$API_KEY node index.js > /tmp/catalyst.log 2>&1 &
FUNCTION_PID=$!
echo "   Function started (PID: $FUNCTION_PID)"

# Wait for function to start
sleep 2

echo ""
echo "3. Testing Catalyst function endpoint..."
TEST_RESPONSE=$(curl -s "http://localhost:9000/weather?city=London")

if [[ $TEST_RESPONSE == *"\"success\":true"* ]]; then
    echo "✅ Catalyst function working!"
    echo ""
    echo "Sample response:"
    echo "$TEST_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$TEST_RESPONSE"
else
    echo "❌ Catalyst function failed!"
    echo "   Response: $TEST_RESPONSE"
    kill $FUNCTION_PID 2>/dev/null
    exit 1
fi

echo ""
echo "======================================"
echo "✅ Backend is ready!"
echo ""
echo "Next steps:"
echo "  1. Keep this terminal running (backend on port 9000)"
echo "  2. Open new terminal and run: cd myapp && npm start"
echo "  3. Open browser: http://localhost:3000"
echo "  4. Search for any city!"
echo ""
echo "Press Ctrl+C to stop the backend"
echo "======================================"

# Keep function running
wait $FUNCTION_PID
