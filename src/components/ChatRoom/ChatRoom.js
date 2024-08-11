import React from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import ChatContent from './ChatContent';

export default function ChatRoom() {

    const { group_Id } = useParams();

    return (
        <>
            <div className='row'>
                <div className='col-sm-3 col-md-3'>
                    <Sidebar />
                </div>
                <div className='col-sm-9 col-md-9'>
                    <ChatContent group_Id={group_Id} />
                </div>
            </div>
        </>
    );
}
