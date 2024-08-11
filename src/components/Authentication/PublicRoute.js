// PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const token = sessionStorage.getItem('token');

    if (token) {
        // If a token is found, redirect to the home page (or any other protected route)
        return <Navigate to="/" />;
    }

    // If no token is found, render the children (login or registration page)
    return children;
};

export default PublicRoute;
