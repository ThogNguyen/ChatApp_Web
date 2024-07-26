import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import ListUser from './ListUser';

export default function ChatRoom() {
    return (
        <>
            <div className='row'>
                <div className='col-md-3'>
                    <Sidebar />
                </div>
                <div className='col-md-6'>
                    <ChatWindow />  
                </div>
                <div className='col-md-3'>
                    <ListUser />  
                </div>
            </div>
        </>
    );
}
