//server/index.js

// Load environment variables
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const users = require("../users.json");
const app = express();
const PORT = 3001;

// TMDb API Configuration
// Get API key from environment variable
// Sign up at https://www.themoviedb.org/settings/api to get your own free API key
// Create a .env file in the root directory with: TMDB_API_KEY=your_api_key_here
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

app.use(cors());
app.use(express.json());

// Sample movie database with more movies
const movies = [
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: 136,
    complexity: "complex",
    description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers."
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: 148,
    complexity: "complex",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    duration: 169,
    complexity: "complex",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 4,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: 152,
    complexity: "medium",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    rating: 8.9,
    duration: 154,
    complexity: "complex",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    duration: 142,
    complexity: "straightforward",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 7,
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
    rating: 8.8,
    duration: 142,
    complexity: "straightforward",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75."
  },
  {
    id: 8,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    rating: 9.2,
    duration: 175,
    complexity: "medium",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    id: 9,
    title: "Fight Club",
    year: 1999,
    genre: "Drama",
    rating: 8.8,
    duration: 139,
    complexity: "complex",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more."
  },
  {
    id: 10,
    title: "Goodfellas",
    year: 1990,
    genre: "Crime",
    rating: 8.7,
    duration: 146,
    complexity: "medium",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners."
  },
  {
    id: 11,
    title: "The Prestige",
    year: 2006,
    genre: "Drama",
    rating: 8.5,
    duration: 130,
    complexity: "complex",
    description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other."
  },
  {
    id: 12,
    title: "Gladiator",
    year: 2000,
    genre: "Action",
    rating: 8.5,
    duration: 155,
    complexity: "straightforward",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery."
  },
  {
    id: 13,
    title: "The Departed",
    year: 2006,
    genre: "Crime",
    rating: 8.5,
    duration: 151,
    complexity: "complex",
    description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston."
  },
  {
    id: 14,
    title: "Schindler's List",
    year: 1993,
    genre: "Drama",
    rating: 9.0,
    duration: 195,
    complexity: "straightforward",
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis."
  },
  {
    id: 15,
    title: "The Silence of the Lambs",
    year: 1991,
    genre: "Crime",
    rating: 8.6,
    duration: 118,
    complexity: "medium",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer."
  }
];

app.get("/api/users", (req, res) => {
    return res.json(users);
});

// Movie recommendations endpoint
app.get("/api/movies", (req, res) => {
    const { search, genre } = req.query;
    
    let filteredMovies = movies;
    
    // Filter by search term if provided
    if (search) {
        const searchLower = search.toLowerCase();
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchLower) ||
            movie.genre.toLowerCase().includes(searchLower) ||
            movie.description.toLowerCase().includes(searchLower)
        );
    }
    
    // Filter by genre if provided
    if (genre) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.genre.toLowerCase() === genre.toLowerCase()
        );
    }
    
    // If no search or genre, return all movies (recommendations)
    if (!search && !genre) {
        // Return a random selection of 6 movies as recommendations
        const shuffled = [...movies].sort(() => 0.5 - Math.random());
        filteredMovies = shuffled.slice(0, 6);
    }
    
    return res.json(filteredMovies);
});

// Get movie by ID
app.get("/api/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    
    return res.json(movie);
});

// Helper function to fetch movies from TMDb API
async function fetchMoviesFromTMDB(genreId = null, minRating = 7.0) {
    try {
        let url;
        
        if (genreId) {
            // Fetch movies by genre
            url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&vote_average.gte=${minRating}&sort_by=popularity.desc&page=1`;
        } else {
            // Fetch popular movies
            url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=1`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`TMDb API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching from TMDb API:', error);
        return [];
    }
}

// Helper function to map TMDb genre IDs to genre names
const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

// Helper function to get genre ID from genre name
function getGenreId(genreName) {
    const genreMapReverse = {
        "action": 28,
        "adventure": 12,
        "animation": 16,
        "comedy": 35,
        "crime": 80,
        "documentary": 99,
        "drama": 18,
        "family": 10751,
        "fantasy": 14,
        "history": 36,
        "horror": 27,
        "music": 10402,
        "mystery": 9648,
        "romance": 10749,
        "sci-fi": 878,
        "thriller": 53,
        "war": 10752,
        "western": 37
    };
    return genreMapReverse[genreName.toLowerCase()] || null;
}

// Helper function to transform TMDb movie data to our format
function transformTMDBMovie(tmdbMovie) {
    // Determine complexity based on vote count and popularity (heuristic)
    let complexity = "medium";
    if (tmdbMovie.vote_count > 5000 && tmdbMovie.popularity > 50) {
        complexity = "complex";
    } else if (tmdbMovie.vote_count < 1000) {
        complexity = "straightforward";
    }
    
    // Get primary genre
    const primaryGenre = tmdbMovie.genre_ids && tmdbMovie.genre_ids.length > 0
        ? genreMap[tmdbMovie.genre_ids[0]] || "Drama"
        : "Drama";
    
    return {
        id: tmdbMovie.id,
        title: tmdbMovie.title,
        year: new Date(tmdbMovie.release_date).getFullYear(),
        genre: primaryGenre,
        rating: (tmdbMovie.vote_average / 10) * 10, // Convert to 0-10 scale, then to 0-10
        duration: null, // TMDb doesn't provide duration in list endpoint
        complexity: complexity,
        description: tmdbMovie.overview || "No description available.",
        poster_path: tmdbMovie.poster_path ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}` : null,
        tmdb_id: tmdbMovie.id
    };
}

// Personalized recommendations endpoint based on questionnaire
app.post("/api/recommendations", async (req, res) => {
    const answers = req.body;
    
    try {
        // Determine genre and rating preferences from answers
        const preferredGenre = answers[1] ? answers[1].toLowerCase() : null;
        const genreId = preferredGenre ? getGenreId(preferredGenre) : null;
        
        // Determine minimum rating from answer
        let minRating = 7.0;
        if (answers[4]) {
            const ratingPref = answers[4].toLowerCase();
            if (ratingPref.includes("8.0+")) {
                minRating = 8.0;
            } else if (ratingPref.includes("7.0-8.0")) {
                minRating = 7.0;
            } else {
                minRating = 6.0;
            }
        }
        
        // Fetch movies from TMDb API
        let tmdbMovies = [];
        if (TMDB_API_KEY) {
            tmdbMovies = await fetchMoviesFromTMDB(genreId, minRating);
            
            // If we got results, use them; otherwise fall back to local data
            if (tmdbMovies.length === 0) {
                console.log('No results from TMDb, using local data');
                tmdbMovies = movies;
            } else {
                // Transform TMDb movies to our format
                tmdbMovies = tmdbMovies.map(transformTMDBMovie);
            }
        } else {
            console.log('TMDb API key not configured, using local data');
            tmdbMovies = movies;
        }
        
        // Scoring algorithm for personalized recommendations
        const scoredMovies = tmdbMovies.map(movie => {
        let score = 0;
        
        // Question 1: Genre preference (highest weight)
        if (answers[1]) {
            const preferredGenre = answers[1].toLowerCase();
            if (movie.genre.toLowerCase() === preferredGenre) {
                score += 50;
            } else {
                // Partial match for similar genres
                const genreSimilarity = {
                    "action": ["adventure", "thriller"],
                    "sci-fi": ["fantasy", "thriller"],
                    "drama": ["romance", "thriller"],
                    "crime": ["thriller", "action"],
                    "comedy": ["romance", "family"],
                    "horror": ["thriller", "mystery"],
                    "romance": ["drama", "comedy"],
                    "thriller": ["crime", "mystery"]
                };
                if (genreSimilarity[preferredGenre] && 
                    genreSimilarity[preferredGenre].includes(movie.genre.toLowerCase())) {
                    score += 25;
                }
            }
        }
        
        // Question 2: Mood matching
        if (answers[2]) {
            const mood = answers[2].toLowerCase();
            const moodMap = {
                "excited": ["Action", "Sci-Fi"],
                "thoughtful": ["Drama", "Sci-Fi"],
                "relaxed": ["Drama", "Comedy"],
                "adventurous": ["Action", "Sci-Fi"],
                "emotional": ["Drama"],
                "mysterious": ["Crime", "Thriller", "Sci-Fi"]
            };
            if (moodMap[mood] && moodMap[mood].includes(movie.genre)) {
                score += 30;
            }
        }
        
        // Question 3: Duration preference (skip if duration not available from API)
        if (answers[3] && movie.duration) {
            const durationPref = answers[3].toLowerCase();
            if (durationPref.includes("short") && movie.duration < 90) {
                score += 20;
            } else if (durationPref.includes("medium") && movie.duration >= 90 && movie.duration <= 120) {
                score += 20;
            } else if (durationPref.includes("long") && movie.duration > 120) {
                score += 20;
            } else if (durationPref.includes("doesn't matter")) {
                score += 20;
            }
        } else if (answers[3] && answers[3].toLowerCase().includes("doesn't matter")) {
            score += 20;
        }
        
        // Question 4: Rating preference
        if (answers[4]) {
            const ratingPref = answers[4].toLowerCase();
            if (ratingPref.includes("8.0+") && movie.rating >= 8.0) {
                score += 25;
            } else if (ratingPref.includes("7.0-8.0") && movie.rating >= 7.0 && movie.rating < 8.0) {
                score += 25;
            } else if (ratingPref.includes("any rating")) {
                score += 25;
            } else if (ratingPref.includes("classic") && movie.year < 2000) {
                score += 25;
            }
        }
        
        // Boost score for movies from API (real data)
        if (movie.tmdb_id) {
            score += 10;
        }
        
        // Question 5: Complexity preference
        if (answers[5]) {
            const complexityPref = answers[5].toLowerCase();
            if (complexityPref.includes("complex") && movie.complexity === "complex") {
                score += 30;
            } else if (complexityPref.includes("straightforward") && movie.complexity === "straightforward") {
                score += 30;
            } else if (complexityPref.includes("mix")) {
                score += 15; // Give some points for any complexity
            }
        }
        
        // Bonus for high ratings
        score += movie.rating * 2;
        
        return { ...movie, score };
    });
    
    // Sort by score and return top 6 recommendations
    const recommendations = scoredMovies
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(({ score, ...movie }) => movie); // Remove score from response
    
    return res.json(recommendations);
    } catch (error) {
        console.error('Error in recommendations endpoint:', error);
        return res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

// Endpoint to test API connection
app.get("/api/test-api", async (req, res) => {
    try {
        if (TMDB_API_KEY) {
            const testUrl = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=1`;
            const response = await fetch(testUrl);
            
            if (response.ok) {
                const data = await response.json();
                return res.json({ 
                    status: 'success', 
                    message: 'TMDb API is connected!',
                    moviesFound: data.results?.length || 0
                });
            } else {
                return res.status(response.status).json({ 
                    status: 'error', 
                    message: `TMDb API returned status ${response.status}` 
                });
            }
        } else {
            return res.json({ 
                status: 'info', 
                message: 'TMDb API key not configured. Using local data.',
                note: 'Set TMDB_API_KEY environment variable to enable API integration'
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: error.message 
        });
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));