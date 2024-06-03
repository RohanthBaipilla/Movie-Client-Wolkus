import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/Auth/PrivateRoute';
import PlaylistsPage from './components/PlaylistsPage/PlaylistsPage';
import AddToPlaylistPage from './components/AddToPlaylistPage/AddToPlaylistPage';
import PublicPlaylistPage from './components/PublicPlaylistPage/PublicPlaylistPage';
import { createRoot } from 'react-dom/client';
import {ToastContainer} from 'react-toast'
import PublicRoute from './components/Auth/PublicRoute';
import Cookies from 'js-cookie';
import VerifyEmail from './components/Auth/VerifyEmail';
import ResetPassword from './components/Auth/ResetPassword';
import ForgotPassword from './components/Auth/ForgotPassword';


function App() {
  useEffect(() => {
    const checkCookie = () => {
      const currentPath = window.location.pathname;
      if (
        currentPath !== '/signin' &&
        currentPath !== '/signup' &&
        !currentPath.startsWith('/public/playlists') && // Check if the path starts with /public/playlists/
        !currentPath.startsWith('/verify-email') &&
        currentPath !== '/forgot-password' && 
        !currentPath.startsWith('/reset-password')
      ) {
        const myCookie = Cookies.get('logout');
        if (!myCookie) {
          localStorage.clear();
          window.location.href = '/signin';
        }
      }
    };

    const interval = setInterval(checkCookie, 5000); // 5000 ms = 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="main-content">
      <ToastContainer delay={3000} />
        <Routes>
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/playlists" element={<PrivateRoute><PlaylistsPage /></PrivateRoute>} />
          <Route path="/add-to-playlist/:id" element={<PrivateRoute><AddToPlaylistPage /></PrivateRoute>} /> {/* Define route for AddToPlaylistPage */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/public/playlists/:playlistId" element={<PublicPlaylistPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;