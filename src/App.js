import HomePage from './HomePage';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [isHomePage, setIsHomePage] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedDecade, setSelectedDecade] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedLength, setSelectedLength] = useState('');
    const [movies, setMovies] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    useEffect(() => {
      if (currentStep === 5) {
          fetchAndFilterMovies();
      }
    }, [currentStep]);

    const goToPreviousStep = () => {
      if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
      }
    };
    const startQuiz = () => {
      setIsHomePage(false);
      setCurrentStep(1);
    };
    const goToHomePage = () => {
      setIsHomePage(true);
    };
    const handleNextMovie = () => {
      if (currentMovieIndex < movies.length - 1) {
          setCurrentMovieIndex(currentMovieIndex + 1);
      }
    };

    const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentStep(2); // Automatically move to the next step
    };
    const handleRestart = () => {
      // Reset everything and go back to the home page
      setCurrentStep(0);
      setIsHomePage(true);
      setCurrentMovieIndex(0);
      setMovies([]);
      // Reset other states as needed
    };
    const renderMovieDetails = (movie) => {
      if (!movie) {
          return <p>No movie data available.</p>;
      }
  
      // Default values for image properties
      const defaultImageUrl = 'default-image-url.jpg'; // Replace with a valid placeholder image URL
      const imageSrc = movie.primaryImage?.url || defaultImageUrl;
      const imageAlt = movie.titleText?.text || 'No title';
      const imageWidth = movie.primaryImage?.width || 'auto';
      const imageHeight = movie.primaryImage?.height || 'auto';
  
      return (
          <div className="movie-details">
              <img src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} style={{ maxWidth: '100%', height: 'auto' }} />
              <h3>{movie.titleText?.text || 'Unknown Title'}</h3>
              <p>Rating: {movie.ratingsSummary?.aggregateRating || 'N/A'} ({movie.ratingsSummary?.voteCount || '0'} votes)</p>
              <p>Release Date: {movie.releaseDate ? `${movie.releaseDate.year}-${movie.releaseDate.month}-${movie.releaseDate.day}` : 'Unknown'}</p>
              <p>Runtime: {movie.runtime ? `${Math.floor(movie.runtime.seconds / 60)} minutes` : 'Unknown'}</p>
              <p>Description: {movie.plot?.plotText?.plainText || 'No description available.'}</p>
              <p>Languages: {movie.language?.id || 'Unknown'}</p>
              <p>Genres: {movie.genres ? movie.genres.genres.map(genre => genre.text).join(', ') : 'Unknown'}</p>
          </div>
      );
  };  
    const renderResultsPage = () => {
      const movie = movies[currentMovieIndex];
      return (
          <div className="results-page">
              {renderMovieDetails(movie)}
              <div className="navigation-buttons">
                  {currentMovieIndex < movies.length - 1 ? (
                      <button onClick={handleNextMovie}>Next</button>
                  ) : (
                      <button onClick={handleRestart}>Restart</button>
                  )}
              </div>
          </div>
      );
    };
    const handleDecadeSelect = (decade) => {
        setSelectedDecade(decade);
        setCurrentStep(3); // Automatically move to the next step
    };

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setCurrentStep(4); // Automatically move to the next step
    };

    const handleLengthSelect = (length) => {
        setSelectedLength(length);
        setCurrentStep(5);
    };
    const renderHomePage = () => (
      <div className="center-container">
        <div className="home-page">
            <h1>Welcome to JDCL Movie Generator</h1>
            <button onClick={() => setCurrentStep(1)} className="start-button">Get Started</button>
        </div>
      </div>
  );

    const renderGenreSelection = () => (
      <div className="center-container">
        <div className="selection-container">
            <h2>What genre of movie are you feeling right now?</h2>
            {['Comedy', 'Drama', 'Horror', 'Thriller', 'Romance'].map(genre => (
                <button key={genre} onClick={() => handleGenreSelect(genre)} className="option-button">
                    {genre}
                </button>
            ))}
        </div>
      </div>
  );

  const renderDecadeSelection = () => (
    <div className="center-container">
      <div className="selection-container">
          <h2>Which decade of movies do you prefer?</h2>
          {['2000s', '2010s', '2020s'].map(decade => (
              <button key={decade} onClick={() => handleDecadeSelect(decade)} className="option-button">
                  {decade}
              </button>
          ))}
      </div>
    </div>
  );

  const renderRegionSelection = () => (
    <div className="center-container">
      <div className="selection-container">
          <h2>What region movie do you prefer?</h2>
          {['English', 'Spanish', 'European', 'Asian', 'Other'].map(region => (
              <button key={region} onClick={() => handleRegionSelect(region)} className="option-button">
                  {region}
              </button>
          ))}
      </div>
    </div>
  );

  const renderLengthSelection = () => (
    <div className="center-container">
      <div className="selection-container">
          <h2>Choose the movie length</h2>
          {['Short', 'Medium', 'Long'].map(length => (
              <button key={length} onClick={() => handleLengthSelect(length)} className="option-button">
                  {length}
              </button>
          ))}
      </div>
    </div>
  );

    const renderCurrentStep = () => {
        switch (currentStep) {
          case 0:
            return renderHomePage();
          case 1:
            return renderGenreSelection();
          case 2:
            return renderDecadeSelection();
          case 3:
            return renderRegionSelection();
          case 4:
            return renderLengthSelection();
          case 5:
            return renderResultsPage();
          default:
            return <div>Final Step or Summary</div>;
        }
    };
    

    const runtimeCategories = {
      'Short': { min: 0, max: 5400 }, // Movies less than 1.5 hours (5400 seconds)
      'Medium': { min: 5400, max: 7200 }, // Movies between 1.5 and 2 hours
      'Long': { min: 7200, max: Infinity } // Movies more than 2 hours
    };
  
    const filterByRuntime = (movies, selectedLength) => {
      const category = runtimeCategories[selectedLength];
      if (!category) {
          return movies; // If no category matches, return all movies
      }
  
      return movies.filter(movie => {
          const runtimeSeconds = movie.runtime && movie.runtime.seconds ? movie.runtime.seconds : 0;
          return runtimeSeconds >= category.min && runtimeSeconds <= category.max;
      });
    };

    const regionMapping = {
      'English': ['en-US', 'en-GB', 'en'], 
      'Spanish': ['es-ES', 'es'],          
      'European': ['fr', 'de', 'it'],      
      'Asian': ['ja', 'ko', 'zh'],         
  };
  
  const filterByRegion = (movies, selectedRegion) => {
      const languageCodes = regionMapping[selectedRegion];
      if (!languageCodes) {
          return movies; 
      }
  
      return movies.filter(movie => {
          
          const movieLanguage = movie.language ? movie.language.id : '';
          return languageCodes.includes(movieLanguage);
      });
  };
  
  
    const fetchAndFilterMovies = async () => {
      try {
          const startYear = selectedDecade.split('s')[0];
          const endYear = (parseInt(startYear, 10) + 9).toString();
          let allMovies = [];
          let page = 1;
          const maxPages = 10;
          while (allMovies.length < 10 && page <= maxPages) {
              const response = await axios.get('https://moviesdatabase.p.rapidapi.com/titles', {
                  params: {
                      genre: selectedGenre,
                      startYear: startYear,
                      endYear: endYear,
                      page: page.toString(),
                      info: 'base_info',
                      limit: '10'
                  },
                  headers: {
                      'X-RapidAPI-Key': '2e6b38c860mshb732a7155bf7869p12e5a5jsnf4d9e954641e',
                      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                  }
              });
  
              allMovies = allMovies.concat(response.data.results);
              page++;
          }
          let filteredMovies = allMovies;
          if (selectedLength) {
              filteredMovies = filterByRuntime(filteredMovies, selectedLength);
          }
          if (selectedRegion) {
              filteredMovies = filterByRegion(filteredMovies, selectedRegion);
          }
  
          filteredMovies = filteredMovies.slice(0, 10);
  
          setMovies(filteredMovies);
      } catch (error) {
          console.error(error);
      }
  };
  
    return (
        <div className="App">
            {isHomePage ? (
                <>
                    <header>
                        <div className="logo">JDCL</div>
                    </header>
                    <HomePage onStart={startQuiz} />
                </>
            ) : (
                <>
                    <header>
                        <div className="logo">JDCL</div>
                        <button className="home-button" onClick={goToHomePage}>Home</button>
                    </header>
                    {renderCurrentStep()}
                    <footer>
                        <button className="nav-button" disabled={currentStep === 0} onClick={goToPreviousStep}>Previous</button>
                    </footer>
                </>
            )}
        </div>
    );
  
}

export default App;

