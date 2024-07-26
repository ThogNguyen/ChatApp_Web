import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; 
import Userinfo from './Userinfo';
import RoomList from './RoomList';

export default function Sidebar() {
    return (
        <>
            <div className='sidebar-container'>
                <div className='row'>
                    <Userinfo />
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <RoomList />
                    </div>
                </div>
            </div>
        </>
    );
}
