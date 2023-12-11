import React, { useState } from 'react';
import HomePage from './HomePage';
import './App.css';

function App() {
  const [isHomePage, setIsHomePage] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLength, setSelectedLength] = useState('');

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

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentStep(2); // Automatically move to the next step
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
      default:
        return <div>Final Step or Summary</div>;
    }
  };

  return (
    <div className="App">
      {isHomePage ? (
        <>
          <header>
            <div className="logo">JDCL</div>
            <img src={logo} className="App-logo" alt="logo" />
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
