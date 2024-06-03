import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, ...rest }) {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to="/signin" />}
    />
  );
}

export default PrivateRoute;
