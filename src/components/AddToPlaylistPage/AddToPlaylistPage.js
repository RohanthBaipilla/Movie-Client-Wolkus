// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './AddToPlaylistPage.css'; // Import your CSS file for styling

// function AddToPlaylistPage() {
//   const { id } = useParams(); // Get the movie title from the route parameter
//   const navigate = useNavigate();
//   const [playlists, setPlaylists] = useState([]);
//   const [selectedPlaylist, setSelectedPlaylist] = useState('');
//   const [newPlaylistName, setNewPlaylistName] = useState('');

//   useEffect(() => {
//     fetchPlaylists();
//   }, []);

//   const fetchPlaylists = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/playlists', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setPlaylists(response.data);
//     } catch (err) {
//       console.error('Error fetching playlists:', err);
//     }
//   };

//   const handleAddToPlaylist = async (playlistId) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/playlists/${playlistId}/movies`, {
//         movieName: id // Assuming `id` is the movie title
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       console.log('Movie added to playlist:', response.data);
//       // Handle success or update state as needed

//       // Redirect to playlists page
//       navigate('/playlists');
//     } catch (err) {
//       console.error('Error adding movie to playlist:', err);
//     }
//   };

//   const handlePlaylistSelect = (playlistId) => {
//     setSelectedPlaylist(playlistId);
//   };

//   const handleCreatePlaylist = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/playlists', {
//         name: newPlaylistName,
//         // You can add other fields like description, owner, etc., as needed
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setPlaylists([...playlists, response.data.playlist]);
//       setNewPlaylistName('');
//     } catch (err) {
//       console.error('Error creating playlist:', err);
//     }
//   };

//   return (
//     <div className="add-to-playlist-page">
//       <h1>Add Movie to Playlist</h1>
//       <b className='movie-title'><p>Movie Title: {id}</p></b>

//       {/* Display user's playlists */}
//       <div className="playlist-cards">
//         {playlists.map(playlist => (
//           <div key={playlist._id} className="playlist-card">
//             <h2>{playlist.name}</h2>
//             <p>{playlist.description}</p>
//             <button className="add-button" onClick={() => handleAddToPlaylist(playlist._id)}>
//               Add to Playlist
//             </button>
//           </div>
//         ))}

//         {/* Form to create a new playlist */}
//         <div className="playlist-card create-playlist">
//           <h2>Create New Playlist</h2>
//           <input
//             type="text"
//             placeholder="Enter Playlist Name"
//             value={newPlaylistName}
//             onChange={(e) => setNewPlaylistName(e.target.value)}
//           />
//           <button className="add-button" onClick={handleCreatePlaylist}>
//             Create Playlist
//           </button>
//         </div>
//       </div>

//       {/* Show add to playlist button if a playlist is selected */}
//       {selectedPlaylist && (
//         <div className="selected-playlist">
//           <h3>Selected Playlist:</h3>
//           <p>{playlists.find(playlist => playlist._id === selectedPlaylist).name}</p>
//           <button onClick={() => handleAddToPlaylist(selectedPlaylist)}>Add to Playlist</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddToPlaylistPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddToPlaylistPage.css'; // Import your CSS file for styling

function AddToPlaylistPage() {
  const { id } = useParams(); // Get the movie title from the route parameter
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('https://movie-server-wolkus.onrender.com/playlists', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlaylists(response.data);
      // toast.success('Playlists fetched successfully!');
    } catch (err) {
      console.error('Error fetching playlists:', err);
      toast.error('Failed to fetch playlists.');
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    const selectedPlaylist = playlists.find(playlist => playlist._id === playlistId);

    if (selectedPlaylist.movies.includes(id)) {
      toast.error('Movie already exists in the playlist.');
      return;
    }

    try {
      const response = await axios.post(`https://movie-server-wolkus.onrender.com/playlists/${playlistId}/movies`, {
        movieName: id // Assuming `id` is the movie title
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Movie added to playlist:', response.data);
      toast.success('Movie added to playlist successfully!');
      // Handle success or update state as needed

      // Redirect to playlists page after a short delay to show the toast
      setTimeout(() => {
        navigate('/playlists');
      }, 1000); // 1 second delay
    } catch (err) {
      console.error('Error adding movie to playlist:', err);
      toast.error('Failed to add movie to playlist.');
    }
  };

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylist(playlistId);
  };

  const handleCreatePlaylist = async () => {
    try {
      const response = await axios.post('https://movie-server-wolkus.onrender.com/playlists', {
        name: newPlaylistName,
        // You can add other fields like description, owner, etc., as needed
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlaylists([...playlists, response.data.playlist]);
      setNewPlaylistName('');
      toast.success('Playlist created successfully!');
    } catch (err) {
      console.error('Error creating playlist:', err);
      toast.error('Failed to create playlist.');
    }
  };

  return (
    <div className="add-to-playlist-page">
      <ToastContainer />
      <h1>Add Movie to Playlist</h1>
      <b className='movie-title'><p>Movie Title: {id}</p></b>

      {/* Display user's playlists */}
      <div className="playlist-cards">
        {playlists.map(playlist => (
          <div key={playlist._id} className="playlist-card">
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
            <button className="add-button" onClick={() => handleAddToPlaylist(playlist._id)}>
              Add to Playlist
            </button>
          </div>
        ))}

        {/* Form to create a new playlist */}
        <div className="playlist-card create-playlist">
          <h2>Create New Playlist</h2>
          <input
            type="text"
            placeholder="Enter Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button className="add-button" onClick={handleCreatePlaylist}>
            Create Playlist
          </button>
        </div>
      </div>

      {/* Show add to playlist button if a playlist is selected */}
      {selectedPlaylist && (
        <div className="selected-playlist">
          <h3>Selected Playlist:</h3>
          <p>{playlists.find(playlist => playlist._id === selectedPlaylist).name}</p>
          <button onClick={() => handleAddToPlaylist(selectedPlaylist)}>Add to Playlist</button>
        </div>
      )}
    </div>
  );
}

export default AddToPlaylistPage;