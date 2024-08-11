import React from 'react';
import ChatWindow from './ChatWindow';
import ListUser from './ListUser';
import './ChatContent.css';

export default function ChatContent({ groupId }) {
    return (
        <div className='row'>
            {!groupId ? (
                <div className='col-md-12'>
                    <div className="placeholder">
                        <p>Please select a group to start chatting.</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className='col-md-8'>
                        <ChatWindow groupId={groupId} />
                    </div>
                    <div className='col-md-4'>
                        <ListUser groupId={groupId} />
                    </div>
                </>
            )}
        </div>
    );
}