import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PlaylistsPage.css';

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsername();
    fetchPlaylists();
  }, []);

  const fetchUsername = () => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('https://movie-server-wolkus.onrender.com/playlists', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlaylists(response.data);
      localStorage.setItem('playlists', JSON.stringify(response.data));
    } catch (err) {
      console.error('Error fetching playlists:', err);
    }
  };

  const handleCreatePlaylist = async () => {
    try {
      const response = await axios.post('https://movie-server-wolkus.onrender.com/playlists', {
        name: newPlaylistName
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlaylists([...playlists, response.data.playlist]);
      setNewPlaylistName('');
      toast.success(`Playlist "${response.data.playlist.name}" created successfully!`);
    } catch (err) {
      console.error('Error creating playlist:', err);
    }
  };

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylist(selectedPlaylist === playlistId ? '' : playlistId);
  };

  const handleAddMovieRedirect = () => {
    navigate('/');
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`https://movie-server-wolkus.onrender.com/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlaylists(playlists.filter(playlist => playlist._id !== playlistId));
      toast.success('Playlist deleted successfully!');
    } catch (err) {
      console.error('Error deleting playlist:', err);
    }
  };

  const handleDeleteMovie = async (playlistId, movieName) => {
    try {
      await axios.delete(`https://movie-server-wolkus.onrender.com/playlists/${playlistId}/movies/${encodeURIComponent(movieName)}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const updatedPlaylists = [...playlists];
      const playlistIndex = updatedPlaylists.findIndex(playlist => playlist._id === playlistId);

      if (playlistIndex !== -1) {
        const movieIndex = updatedPlaylists[playlistIndex].movies.findIndex(movie => movie === movieName);

        if (movieIndex !== -1) {
          updatedPlaylists[playlistIndex].movies.splice(movieIndex, 1);
          setPlaylists(updatedPlaylists);
          toast.success('Movie deleted successfully from the playlist!');
        }
      }
    } catch (err) {
      console.error('Error deleting movie from playlist:', err);
    }
  };

  const handleMakePublic = async (playlistId) => {
    try {
      await axios.put(`https://movie-server-wolkus.onrender.com/playlists/${playlistId}/public`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedPlaylists = playlists.map(playlist =>
        playlist._id === playlistId ? { ...playlist, isPublic: true } : playlist
      );
      setPlaylists(updatedPlaylists);
      toast.success('Playlist made public successfully!');
    } catch (err) {
      console.error('Error making playlist public:', err);
    }
  };

  const handleMakePrivate = async (playlistId) => {
    try {
      await axios.put(`https://movie-server-wolkus.onrender.com/playlists/${playlistId}/private`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedPlaylists = playlists.map(playlist =>
        playlist._id === playlistId ? { ...playlist, isPublic: false } : playlist
      );
      setPlaylists(updatedPlaylists);
      toast.success('Playlist made private successfully!');
    } catch (err) {
      console.error('Error making playlist private:', err);
    }
  };

  const getPublicPlaylistUrl = (playlistId) => {
    return `${window.location.origin}/public/playlists/${playlistId}`;
  };

  return (
    <div className="playlists-container">
      <ToastContainer />
      <h2><center>My Playlists</center></h2>
      <div className="playlist-form">
        <input
          type="text"
          className="playlist-input"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="Enter playlist name"
        />
        <div className="button-group">
          <button className="create-btn" onClick={handleCreatePlaylist}>
            Create Playlist
          </button>
          <button className="add-movie-btn" onClick={handleAddMovieRedirect}>
            Add Movie to Playlist
          </button>
        </div>
      </div>

      <b>
        <ul className="playlist-list">
          {playlists.map(playlist => (
            <li
              key={playlist._id}
              className={`playlist-item ${selectedPlaylist === playlist._id ? 'expanded' : ''}`}
              onClick={() => handlePlaylistSelect(playlist._id)}
            >
              <div className="playlist-header">
                <span>{playlist.name} ({playlist.movies.length} movies)</span>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeletePlaylist(playlist._id); }}>Delete</button>
                {playlist.isPublic ? (
                  <button className="public-btn" onClick={(e) => { e.stopPropagation(); handleMakePrivate(playlist._id); }}>Make Private</button>
                ) : (
                  <button className="public-btn" onClick={(e) => { e.stopPropagation(); handleMakePublic(playlist._id); }}>Make Public</button>
                )}
                {playlist.isPublic && (
                  <a
                    href={getPublicPlaylistUrl(playlist._id)}
                    target="_blank"
                    style={{ marginLeft: "10px" }}
                    rel="noopener noreferrer"
                    className="public-url"
                  >
                    Public URL
                  </a>
                )}
              </div>
              {selectedPlaylist === playlist._id && (
                <ul className="movies-list">
                  {playlist.movies.length === 0 ? (
                    <li className="no-movies">No movies in this playlist</li>
                  ) : (
                    playlist.movies.map(movie => (
                      <li key={movie} className="movie-item">
                        <p>{movie}</p>
                        <button className="delete-movie-btn" onClick={(e) => { e.stopPropagation(); handleDeleteMovie(playlist._id, movie); }}>Delete</button>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </b>
    </div>
  );
}

export default PlaylistsPage;
