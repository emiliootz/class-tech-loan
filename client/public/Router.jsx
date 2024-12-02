/**
 * This purpose of this class is to provide all routes for the application, and allow
 * a user access to them if they are a valid user with the correct access level.
 */

import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import LoginPage from '../src/LoginPage';
import ProtectedRoute from './authentication/ProtectedRoute';
import Cookies from 'js-cookie';

// Function to get the access token from cookies
const getAccessToken = () => {
    return Cookies.get('accessToken');
  }
  
  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return !!getAccessToken();
  }

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LoginPage />,
            index: true
        },
        {
            element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
            children: [
                {
                    path: '/equipment',
                    // Add element: <Equipment /> when page is added
                },
                {
                    path: '/view-cart',
                    // Add element: <Cart /> when page is added
                },
                {
                    path: '/view-item/{$id}'
                    // Add element <ViewItem id={id} />
                },
                {
                    path: '/loaned-items',
                    // Add element: <LoanedItems /> when page is added
                },
            ]
        },
        {
            path: '*',
            element: <p>404 Error - Nothing here...</p>
        }
    ]
);

export default router;