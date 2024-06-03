import React, { useState } from 'react';
import axios from 'axios';

function CreatePlaylist({ onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://movie-server-wolkus.onrender.com/playlists', {
      name,
      description,
      isPublic,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    onSave(response.data.playlist);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Playlist Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>
        <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        Public
      </label>
      <button type="submit">Create Playlist</button>
    </form>
  );
}

export default CreatePlaylist;
