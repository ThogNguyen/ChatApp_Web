import React from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import ChatContent from './ChatContent';

export default function ChatRoom() {

    const { groupId } = useParams();

    return (
        <>
            <div className='row'>
                <div className='col-md-3'>
                    <Sidebar />
                </div>
                {/* <div className='col-md-6'>
                    <ChatWindow groupId={groupId} />
                </div>
                <div className='col-md-3'>
                    <ListUser groupId={groupId} />
                </div> */}
                <div className='col-md-9'>
                    <ChatContent groupId={groupId} />
                </div>
            </div>
        </>
    );
}
