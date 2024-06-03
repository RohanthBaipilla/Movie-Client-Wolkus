import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  // Check if user is logged in and retrieve username from localStorage
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Movie Hunters
        </Link>
        <div className="navbar-menu navbar-menu-left">
        {isLoggedIn && (
            
            <Link to="/" className="navbar-item">
            Home
          </Link>
          )}
          {isLoggedIn && (
            
            <Link to="/profile" className="navbar-item">
              Profile
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/playlists" className="navbar-item">
              Playlists
            </Link>
          )}
        </div>
        <div className="navbar-menu navbar-menu-right">
          {isLoggedIn ? (
            <>
              <span className="navbar-username">Welcome "{username}"</span>
              <button onClick={handleLogout} className="navbar-item button">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="navbar-item button">
                Sign In
              </Link>
              <Link to="/signup" className="navbar-item button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
