import React from 'react';

function HomePage({ onStart }) {
    return (
        <div className="center-container">
            <div className="home-page">
                <h1 className="home-title">Welcome to JDCL Movie Generator</h1>
                <button className="start-button" onClick={onStart}>Get Started</button>
            </div>
        </div>
    );
}

export default HomePage;
