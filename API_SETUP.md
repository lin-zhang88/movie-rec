# API Setup Guide

## TMDb API Integration

This application integrates with **The Movie Database (TMDb) API** to fetch real-time movie data, demonstrating API integration skills.

## Setup Instructions

### 1. Get Your Free API Key

1. Visit [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to **Settings** → **API**
4. Request an API key (free tier is available)
5. Copy your API key

### 2. Configure Environment Variables

1. Create a `.env` file in the root directory of the project
2. Add the following line:
   ```
   TMDB_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with your actual API key

### 3. Verify API Connection

1. Start the application: `npm start`
2. Visit `http://localhost:3001/api/test-api` in your browser
3. You should see a JSON response indicating API status

### 4. How It Works

- **With API Key**: The app fetches real-time movie data from TMDb API
- **Without API Key**: The app falls back to local sample data
- The frontend displays API connection status in the quiz interface

## API Endpoints Used

- `GET /discover/movie` - Discover movies by genre and filters
- `GET /movie/popular` - Get popular movies
- All requests are made server-side to keep API keys secure

## Skills Demonstrated

✅ **API Integration**: Real-time data fetching from third-party API  
✅ **Environment Variables**: Secure API key management  
✅ **Error Handling**: Graceful fallback when API is unavailable  
✅ **Data Transformation**: Converting API responses to application format  
✅ **RESTful API Design**: Clean backend endpoints for frontend consumption

