import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://www.omdbapi.com/?apikey=ec28b4fa&s=${query}`);
      setMovies(res.data.Search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for movies..." />
      <button onClick={handleSearch}>Search</button>
      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
