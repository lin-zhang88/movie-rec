**🎬 Movie Recommendation System**

A web application that delivers personalized movie recommendations by integrating with a third-party movie API. Built with JavaScript, HTML, and CSS, the app demonstrates seamless frontend–backend interaction, real-time API data handling, and user-friendly design.

**🚀 Features**

🔎 Search & Recommendations – Fetches real-time data from a third-party movie API

🎨 Responsive Frontend – Built with JavaScript, HTML, and CSS for smooth user interaction

⚙️ Backend Logic – Handles API requests and dynamically renders movie details

🔗 System Integration – Ensures clean communication between frontend and backend

👤 User Experience Focused – Intuitive interface for browsing and discovering movies

**🛠️ Tech Stack**

Languages: JavaScript, HTML, CSS

Frontend: React

Backend: Node.js, Express

API: TMDb (The Movie Database) API - Real-time movie data integration

Tools: Git/GitHub for version control, VS Code for development

**🔑 API Setup**

This application integrates with the TMDb (The Movie Database) API to fetch real-time movie data.

1. Get your free API key:
   - Visit https://www.themoviedb.org/
   - Sign up for a free account
   - Go to Settings > API
   - Request an API key (free tier available)

2. Configure the API key:
   - Create a `.env` file in the root directory
   - Add: `TMDB_API_KEY=your_api_key_here`
   - The app will automatically use the API when the key is configured
   - Without an API key, the app falls back to local sample data

3. Test API connection:
   - Visit `http://localhost:3001/api/test-api` to verify API connectivity
   - The frontend displays API status in the quiz interface

**⚡ How It Works**

User searches or requests recommendations.

Application sends an API request to fetch movie data.

Backend logic parses and returns movie details.

Frontend dynamically renders results in a clean interface.

**🎯 Skills Highlighted**

API Integration

Frontend Development (JavaScript, HTML, CSS)

Backend Request Handling

System Integration

User Experience Design

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
