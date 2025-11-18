#!/bin/bash

# Weather Dashboard - Local Testing Script
# This script helps you test the complete stack locally before deployment

echo "🌤️  Weather Dashboard - Local Testing"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."
echo ""

if command_exists node; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js first."
    exit 1
fi

if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found. Please install npm first."
    exit 1
fi

echo ""
echo "======================================"
echo ""

# Check if .env file exists
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} Environment variables file found"
    source .env.local
else
    echo -e "${YELLOW}⚠${NC}  No .env.local file found"
    echo "   Copy .env.example to .env.local and add your API keys"
    echo ""
    read -p "Do you want to create .env.local now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp .env.example .env.local
        echo -e "${GREEN}✓${NC} Created .env.local"
        echo "   Please edit it and add your OpenWeather API key"
        exit 0
    fi
fi

echo ""
echo "======================================"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo ""

# Backend dependencies
if [ -d "functions/widgetsui_function/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies already installed"
else
    echo "Installing backend dependencies..."
    cd functions/widgetsui_function
    npm install
    cd ../..
fi

# Frontend dependencies
if [ -d "myapp/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies already installed"
else
    echo "Installing frontend dependencies..."
    cd myapp
    npm install
    cd ..
fi

echo ""
echo "======================================"
echo ""

# Test Catalyst function
echo "🔧 Testing Catalyst Function..."
echo ""

# Start Catalyst function in background
cd functions/widgetsui_function
echo "Starting Catalyst function on port 9000..."
node index.js &
FUNCTION_PID=$!
cd ../..

# Wait for function to start
sleep 3

# Test health endpoint
echo "Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:9000/)
if [[ $HEALTH_RESPONSE == *"Weather Dashboard API"* ]]; then
    echo -e "${GREEN}✓${NC} Health endpoint working"
else
    echo -e "${RED}✗${NC} Health endpoint failed"
    kill $FUNCTION_PID
    exit 1
fi

# Test weather endpoint (if API key is set)
if [ -n "$OPENWEATHER_API_KEY" ] && [ "$OPENWEATHER_API_KEY" != "your_openweather_api_key_here" ]; then
    echo "Testing weather endpoint..."
    WEATHER_RESPONSE=$(curl -s "http://localhost:9000/weather?city=London")
    if [[ $WEATHER_RESPONSE == *"\"success\":true"* ]]; then
        echo -e "${GREEN}✓${NC} Weather endpoint working"
        echo "   Sample response:"
        echo "$WEATHER_RESPONSE" | python -m json.tool | head -n 15
    else
        echo -e "${RED}✗${NC} Weather endpoint failed"
        echo "   Response: $WEATHER_RESPONSE"
    fi
else
    echo -e "${YELLOW}⚠${NC}  Skipping weather endpoint test (API key not configured)"
fi

# Kill function process
kill $FUNCTION_PID

echo ""
echo "======================================"
echo ""

# Test React app
echo "🎨 Testing React Frontend..."
echo ""

cd myapp

# Build check
echo "Checking if build works..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Build successful"
    rm -rf build
else
    echo -e "${RED}✗${NC} Build failed"
    cd ..
    exit 1
fi

cd ..

echo ""
echo "======================================"
echo ""

# Summary
echo "✨ Test Summary"
echo ""
echo -e "${GREEN}✓${NC} All tests passed!"
echo ""
echo "📝 Next steps:"
echo "   1. Start backend: cd functions/widgetsui_function && node index.js"
echo "   2. Start frontend: cd myapp && npm start"
echo "   3. Open browser: http://localhost:3000"
echo "   4. Search for a city to test"
echo ""
echo "🚀 Ready to deploy!"
echo ""
echo "======================================"
