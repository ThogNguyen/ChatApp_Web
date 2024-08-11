import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Userinfo.css';

export default function Userinfo() {

    const [username, setUsername] = useState('');

    useEffect(() => {
        // Get token from session storage
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                // Decode the token
                const decodedToken = jwtDecode(token);
                //console.log(decodedToken);
                const userNameClaim = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                setUsername(userNameClaim || '');
                //console.log('Decoded Username:', userNameClaim);
            } catch (error) {
                console.error('Token decoding failed:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.href = '/login'; 
    };

    return (
        <div className='user-info-container'>
            <div className='user-info-username'>
                Hi, {username ? username : 'Loading...'}
            </div>
            <button 
                className='btn btn-danger user-info-logout-btn'
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}
