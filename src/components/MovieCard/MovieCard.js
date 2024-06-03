import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieCard.css';
import MovieDetailsModal from '../MovieDetailsModal/MovieDetailsModal';
import useDebounce from './useDebounce';

function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchMovies = async (query, page = 1) => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`https://movie-server-wolkus.onrender.com/search/${query}`);
        setLoading(false);
        if (response.data.Response === "True") {
          return response.data.Search;
        } else {
          setError('Movie not found');
          return [];
        }
      } catch (error) {
        setLoading(false);
        console.error(`Error fetching movies for query ${query}:`, error);
        setError('Error fetching movies');
        return [];
      }
    };

    const fetchInitialMovies = async () => {
      const queries = ['batman', 'avengers', 'telugu', 'hindi', 'english'];
      let allMovies = [];
      for (const query of queries) {
        const movies = await fetchMovies(query);
        allMovies = [...allMovies, ...movies];
      }
      setMovies(allMovies);
    };

    if (debouncedSearchTerm) {
      fetchMovies(debouncedSearchTerm).then(movies => setMovies(movies));
    } else {
      fetchInitialMovies();
    }
  }, [debouncedSearchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map(movie => (
            <div className="movie-card" key={movie.imdbID} onClick={() => handleCardClick(movie)}>
              <img src={movie.Poster !== "N/A" ? movie.Poster : "https://cdn.domestika.org/raw/upload/assets/projects/project-default-cover-1248c9d991d3ef88af5464656840f5534df2ae815032af0fdf39562fee08f0a6.svg"} alt={movie.Title} />
              <div className="movie-info">
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{error || 'No movies found.'}</p>
      )}
      {selectedMovie !== null && (
        <MovieDetailsModal movieObj={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default MovieCard;
