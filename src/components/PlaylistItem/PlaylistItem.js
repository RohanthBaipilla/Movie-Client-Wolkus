import React from 'react';

function PlaylistItem({ playlist, onAddToPlaylist }) {
  const handleAddToPlaylist = () => {
    // Implement your logic for adding the movie to this playlist here
    // Example: Call the parent component's function to add the movie to this playlist
    onAddToPlaylist(playlist);
  };

  return (
    <div className="playlist-item">
      <div className="playlist-details">
        <div className="playlist-name">{playlist.name}</div>
        <button className="add-to-playlist-button" onClick={handleAddToPlaylist}>
          Add
        </button>
      </div>
    </div>
  );
}

export default PlaylistItem;
