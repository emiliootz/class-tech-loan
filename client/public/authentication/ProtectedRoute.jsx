/**
 * The purpose of this utility class is to protect certain paths from being accessed if the
 * user does not have the valid access level.
 * 
 * https://www.angularminds.com/blog/protected-routes-in-react-router-authentication-and-authorization
 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;