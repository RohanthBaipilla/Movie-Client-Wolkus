import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PublicPlaylistPage.css';

function PublicPlaylistPage() {
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { playlistId } = useParams();

  useEffect(() => {
    const fetchPublicPlaylist = async () => {
      try {
        const response = await axios.get(`https://movie-server-wolkus.onrender.com/public/playlists/${playlistId}`);
        if (!response.data.isPublic) {
          setError('This is a private playlist.');
        } else {
          setPlaylist(response.data.playlist);
        }
      } catch (err) {
        console.error('Error fetching public playlist:', err);
        setError('Playlist not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPlaylist();
  }, [playlistId]);

  if (loading) {
    return <div className="public-playlist-page">Loading...</div>;
  }

  if (error) {
    return <div style={{ marginTop: "150px" }} className="public-playlist-page">{error}</div>;
  }

  if (!playlist) {
    return null; // or another loading state if needed
  }

  return (
    <div className="public-playlist-page">
      <h2>Playlist Name: <b>{playlist.name}</b></h2>
      <p>Public Playlist</p>
      <div className="playlist-details">
        <p><strong>Creator:</strong> {playlist.user.username}</p>
        <p><strong>Email:</strong> {playlist.user.email}</p>
        <p><strong>Public:</strong> {playlist.isPublic ? 'Yes' : 'No'}</p>
        <p><strong>Movies:</strong></p>
        {playlist.isPublic ? (
          <ul className="movies-list">
            {playlist.movies.length > 0 ? (
              playlist.movies.map((movie, index) => (
                <li key={index}>{movie}</li>
              ))
            ) : (
              <p>No movies added to this playlist</p>
            )}
          </ul>
        ) : (
          <p className="error-message">This playlist is private.</p>
        )}
      </div>
    </div>
  );
}

export default PublicPlaylistPage;
