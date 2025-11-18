# Weather Dashboard - Complete Deployment Guide

## 🚀 Quick Start Deployment

### Prerequisites
- Zoho Cliq account (free)
- OpenWeather API key (free tier)
- Catalyst CLI installed
- Node.js and npm installed

---

## 📋 Step-by-Step Deployment

### Phase 1: OpenWeather API Setup (5 minutes)

1. **Get API Key**
   ```
   1. Visit: https://openweathermap.org/api
   2. Click "Sign Up" (it's free!)
   3. Verify your email
   4. Go to API Keys section
   5. Copy your API key
   ```

2. **Save API Key**
   ```
   Keep this handy - you'll need it for Catalyst environment variables
   Free tier: 60 calls/minute, 1M calls/month (more than enough!)
   ```

---

### Phase 2: Catalyst CLI Setup (10 minutes)

1. **Install Catalyst CLI**
   ```bash
   npm install -g zcatalyst-cli
   ```

2. **Login to Catalyst**
   ```bash
   catalyst login
   ```
   - Opens browser for authentication
   - Select your Zoho account
   - Grant permissions

3. **Verify Installation**
   ```bash
   catalyst --version
   ```

---

### Phase 3: Deploy Catalyst Function (15 minutes)

1. **Navigate to Project**
   ```bash
   cd /c/Users/admin/Desktop/zoho
   ```

2. **Initialize Catalyst Project** (if not done)
   ```bash