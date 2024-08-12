import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ListUser from './ListUser';
import './ChatContent.css';

export default function ChatContent({ group_Id }) {
    const [users, setUsers] = useState([]);
    const [memberCount, setMemberCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            if (group_Id) {
                try {
                    const token = sessionStorage.getItem('token');
                    const response = await fetch(`https://localhost:7186/api/GroupMembers/${group_Id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const fetchedUsers = await response.json();
                        setUsers(fetchedUsers);
                        setMemberCount(fetchedUsers.length);
                    } else {
                        console.error('Failed to fetch users.');
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
        };

        fetchUsers();
    }, [group_Id]);

    const handleUsersFetched = (fetchedUsers) => {
        setUsers(fetchedUsers);
        setMemberCount(fetchedUsers.length);
    };

    const handleUserAdded = (newUser) => {
        setUsers(prevUsers => {
            const updatedUsers = [...prevUsers, newUser];
            setMemberCount(updatedUsers.length);
            return updatedUsers;
        });
    };

    return (
        <div className='row'>
            {!group_Id ? (
                <div className='col-sm-12 col-md-12'>
                    <div className="placeholder">
                        <p>Please select a group to start chatting.</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className='col-sm-8 col-md-8'>
                        <ChatWindow group_Id={group_Id} memberCount={memberCount} onUserAdded={handleUserAdded} />
                    </div>
                    <div className='col-sm-4 col-md-4'>
                        <ListUser group_Id={group_Id} onUsersFetched={handleUsersFetched} />
                    </div>
                </>
            )}
        </div>
    );
}
