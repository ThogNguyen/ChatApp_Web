import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Userinfo.css';

export default function Userinfo() {

    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/login'; 
    };

    return (
        <div className='user-info-container'>
            <div className='user-info-username'>
                Hi, {username ? username : 'Username'}
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
