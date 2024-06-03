import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieDetailsModal.css';

function MovieDetailsModal({ movieObj, onClose }) {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://movie-server-wolkus.onrender.com/movie/${movieObj.imdbID}`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error(`Error fetching movie details for IMDB ID ${movieObj.imdbID}:`, error);
        setMovie(null);
      }
    };

    if (movieObj) {
      fetchMovieDetails();
    }
  }, [movieObj]);

  if (!movie) return null;

  const handleAddToPlaylist = () => {
    navigate(`/add-to-playlist/${encodeURIComponent(movie.Title)}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-left">
          <img src={movie.Poster !== "N/A" ? movie.Poster : "https://cdn.domestika.org/raw/upload/assets/projects/project-default-cover-1248c9d991d3ef88af5464656840f5534df2ae815032af0fdf39562fee08f0a6.svg"} alt={movie.Title} className="modal-poster" />
          <button className="add-to-playlist-button" onClick={handleAddToPlaylist}>
            Add to Playlist
          </button>
        </div>
        <div className="modal-right">
          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Country:</strong> {movie.Country}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>IMDB Votes:</strong> {movie.imdbVotes}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsModal;
