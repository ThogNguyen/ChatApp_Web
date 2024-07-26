import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Userinfo.css'

export default function Userinfo() {
    return (
        <>
            <div className='user-info-container'>
                <div className='user-info-username'>
                    Username
                </div>
                <button className='btn btn-danger user-info-logout-btn'>Logout</button>
            </div>
        </>
    );
}
