import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaylistCard from './PlaylistCard'; // Assume you have a PlaylistCard component to display each playlist

function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('https://movie-server-wolkus.onrender.com/playlists', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        setPlaylists(response.data);
      } catch (err) {
        console.error('Error fetching playlists:', err);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="playlists-container">
      {playlists.map(playlist => (
        <PlaylistCard key={playlist._id} playlist={playlist} />
      ))}
    </div>
  );
}

export default Playlists;
