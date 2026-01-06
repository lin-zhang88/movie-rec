// App.js
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);

  const questions = [
    {
      id: 1,
      question: "What's your favorite movie genre?",
      type: "single",
      options: ["Action", "Sci-Fi", "Drama", "Crime", "Comedy", "Horror", "Romance", "Thriller"]
    },
    {
      id: 2,
      question: "What mood are you in right now?",
      type: "single",
      options: ["Excited", "Thoughtful", "Relaxed", "Adventurous", "Emotional", "Mysterious"]
    },
    {
      id: 3,
      question: "How long of a movie do you prefer?",
      type: "single",
      options: ["Short (under 90 min)", "Medium (90-120 min)", "Long (over 120 min)", "Doesn't matter"]
    },
    {
      id: 4,
      question: "What rating range do you prefer?",
      type: "single",
      options: ["8.0+ (Highly rated)", "7.0-8.0 (Good movies)", "Any rating", "Classic films (older)"]
    },
    {
      id: 5,
      question: "Do you prefer movies with complex plots or straightforward stories?",
      type: "single",
      options: ["Complex and mind-bending", "Straightforward and easy to follow", "A mix of both"]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, get recommendations
      getRecommendations(newAnswers);
    }
  };

  const getRecommendations = async (userAnswers) => {
    setLoading(true);
    setError(null);
    setShowResults(true);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAnswers),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to load recommendations. Please try again.");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setRecommendations([]);
    setShowResults(false);
    setError(null);
  };

  // Generate Google search URL for a movie
  const getGoogleSearchUrl = (movie) => {
    const searchQuery = encodeURIComponent(`${movie.title} ${movie.year} movie`);
    return `https://www.google.com/search?q=${searchQuery}`;
  };

  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/test-api');
        const data = await response.json();
        setApiStatus(data);
      } catch (err) {
        setApiStatus({ status: 'error', message: 'Could not connect to API' });
      }
    };
    checkApiStatus();
  }, []);

  if (showResults) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>🎬 Your Personalized Recommendations</h1>
        </header>

        {loading && (
          <div className="welcome-message">
            <p>Analyzing your preferences...</p>
          </div>
        )}

        {error && (
          <div className="welcome-message" style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)' }}>
            <p>{error}</p>
            <button onClick={handleRestart} className="restart-button">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && recommendations.length > 0 && (
          <div className="recommendations">
            <h2>Movies We Think You'll Love</h2>
            <button onClick={handleRestart} className="restart-button">
              Take Quiz Again
            </button>
            <div className="movie-grid">
              {recommendations.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <h3>{movie.title}</h3>
                  <p className="movie-year">{movie.year}</p>
                  <p className="movie-genre">{movie.genre}</p>
                  <p className="movie-rating">⭐ {movie.rating}</p>
                  <p className="movie-description">{movie.description}</p>
                  <a
                    href={getGoogleSearchUrl(movie)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google-link"
                  >
                    🔍 Search on Google
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && recommendations.length === 0 && (
          <div className="welcome-message">
            <p>No recommendations found. Please try again.</p>
            <button onClick={handleRestart} className="restart-button">
              Take Quiz Again
            </button>
          </div>
        )}
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 Movie Recommendation Quiz</h1>
        <p className="quiz-subtitle">Answer a few questions to get personalized movie recommendations</p>
        
        {apiStatus && (
          <div className={`api-status ${apiStatus.status}`}>
            {apiStatus.status === 'success' && '✅ API Connected'}
            {apiStatus.status === 'info' && 'ℹ️ Using Local Data'}
            {apiStatus.status === 'error' && '⚠️ API Error'}
          </div>
        )}
        
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">Question {currentQuestion + 1} of {questions.length}</p>
      </header>

      <div className="question-container">
        <div className="question-card">
          <h2 className="question-text">{question.question}</h2>
          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
