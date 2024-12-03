/**
 * This purpose of this class is to provide all routes for the application, and allow
 * a user access to them if they are a valid user with the correct access level.
 */

import React, {useState} from 'react';
import {createBrowserRouter} from 'react-router-dom';
import LoginPage from '../src/LoginPage';
import ProtectedRoute from './authentication/ProtectedRoute';
import Cookies from 'js-cookie';
import EquipmentPage from '../src/EquipmentPage';

// Function to get the access token from cookies
const getAccessToken = () => {
    return Cookies.get('accessToken');
  }
  
  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return true; // returns true for testing purposes.
    //return !!getAccessToken();
  }

  /**
   * Determines which URL should be used for the Back-End based on the domain (url) of the Front-End
   * @returns String
   */
  function getBackEndURL() {
    switch (window.location.hostname) {
      case "localhost": // Local environment
      case "127.0.0.1":
        return "http://localhost:8080";
      default:
        return "http://localhost:8080";
    }
  };

  const backendURL = getBackEndURL();


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
                    element: <EquipmentPage backendURL={backendURL} />,
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