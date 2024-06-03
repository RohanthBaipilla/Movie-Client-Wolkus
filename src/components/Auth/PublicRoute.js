import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = token !== null && token !== '';
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
