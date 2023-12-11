import axios from 'axios';
import './App.css';
import { useState } from 'react';

function App() {
const [currentStep, setCurrentStep] = useState(0);
const [selectedGenre, setGenre] = useState('');
const [selectedDecade, setDecade] = useState('');
const [selectedRegion, setRegion] = useState('');
const [selectedLength, setLength] = useState('');
const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const handleGetStartedClick = () => {
setCurrentStep(1);
};
const handleGenreSelect = (genre) => {
setGenre(genre);
setCurrentStep(currentStep + 1);
};
const handleDecadeSelect = (decade) => {
setDecade(decade);
setCurrentStep(currentStep + 1);
};
const handleRegionSelect = (region) => {
setRegion(region);
setCurrentStep(currentStep + 1);
};
const hangleLenthSelect = (length) => {
setLength(length);
setCurrentStep(currentStep + 1);
};

const fetchData = async () => {
setIsLoading(true);
const options = {
method: 'GET',
url: 'https://moviesdatabase.p.rapidapi.com/titles',
params: {
genre: selectedGenre,
startYear: calculateStartYear(selectedDecade),
endYear: calculateEndYear(selectedDecade),
page: '1',
info: 'base_info',
limit: '10'
},
headers: {
'X-RapidAPI-Key': '',//need to update
'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
}
};
try {
const response = await axios.request(options);
setMovies(response.data); // Update according to the actual structure of response
} catch (error) {
console.error('Error fetching data:', error);
}
setIsLoading(false);
};
const calculateStartYear = (decade) => {
const currentYear = 2023;
if (selectedDecade === 'Recent years'){
return currentYear-4;
}else if(selectedDecade === 'Last 5-10 years'){
return currentYear-10;
}else if(selectedDecade === 'Last 10-20 years'){
return currentYear-20;
}else if(selectedDecade === 'Last 20 year or older'){
return null;
}
};
const calculateEndYear = (decade) => {
const currentYear = 2023;
if (selectedDecade === 'Recent years'){
return currentYear;
}else if(selectedDecade === 'Last 5-10 years'){
return currentYear-5;
}else if(selectedDecade === 'Last 10-20 years'){
return currentYear-10;
}else if(selectedDecade === 'Last 20 year or older'){
return null;
}
};
const renderGenreSelection = () => {
const genres = ['Comedy', 'Drama', 'Horror', 'Thriller', 'Romance'];
return (
<div>
<h2>What genre movie are you feeling right now?</h2>
{genres.map(genre => (
<button key={genre} onClick={() => handleGenreSelect(genre)}>
{genre}
</button>
))}
</div>
);
};
const renderDecadeSelection = () => {
const decades = ['Recent years', 'Last 5-10 years', 'Last 10-20 years', 'Last 20 year or older'];
return (
<div>
<h2>Year choice</h2>
{decades.map(decade => (
<button key={decade} onClick={() => handleDecadeSelect(decade)}>
{decade}
</button>
))}
</div>
);
};
const renderRegionSelection = () => {
const regions = ['English', 'Spanish', 'Europe', 'Asian', 'Other'];
return (
<div>
<h2>Region choice</h2>
{regions.map(region => (
<button key={region} onClick={() => handleRegionSelect(region)}>
{region}
</button>
))}
</div>
);
};
const renderLengthSelection = () => {
const lengths = ['Short', 'Median', 'Long'];
return (
<div>
<h2>Runtime choice</h2>
{lengths.map(length => (
<button key={length} onClick={() => hangleLenthSelect(length)}>
{length}
</button>
))}
</div>
);
};


const renderCurrentStep = () => {
switch (currentStep) {
case 1:
return renderGenreSelection();
case 2:
return renderDecadeSelection();
case 3:
return renderRegionSelection();
case 4:
return renderLengthSelection();
default:
return null;
}
};
return (
<div className="App">
{renderCurrentStep()}
</div>
);
}
export default App;