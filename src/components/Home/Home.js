// HomePage.js
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Movie Library</h1>
      {/* <Alert alert={alert} /> */}
      
      <MovieCard />
    </div>
  );
}

export default HomePage;
