// components/PlaylistsPage/PublicPlaylist.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        // Assuming you have an API endpoint to fetch a public playlist by ID
        const response = await axios.get(`/api/public-playlists/${playlistId}`);
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Playlist URL copied to clipboard!');
    });
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="public-playlist">
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>
      <button onClick={handleShare}>Share</button>
      <ul>
        {playlist.songs.map((song, index) => (
          <li key={index}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PublicPlaylist;
