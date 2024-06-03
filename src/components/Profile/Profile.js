import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  // Retrieve user details from local storage
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [editMode, setEditMode] = useState(false);

  const handleUpdate = () => {
    // Update local storage with new username and email
    localStorage.setItem('username', username);
    setEditMode(false);
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>
        {editMode ? (
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button onClick={handleUpdate}>Save</button>
          </div>
        ) : (
          <div>
            <p>Welcome, {username}!</p>
            <p>Your email is: {email}</p>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
