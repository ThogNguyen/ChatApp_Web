// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If token exists, render the children (ChatRoom component)
    return children;
};

export default PrivateRoute;
