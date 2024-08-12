import React, { useEffect, useState } from 'react';
import './ListUser.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListUser({ group_Id, onUsersFetched }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController
        const fetchUsers = async () => {
            const token = sessionStorage.getItem('token');
            if (token && group_Id) {
                try {
                    const response = await fetch(`https://localhost:7186/api/GroupMembers/${group_Id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        signal: controller.signal, // Pass the abort signal
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUsers(data);
                        if (onUsersFetched) {
                            onUsersFetched(data);
                        }
                    } else {
                        const errorData = await response.json();
                        setError(errorData.error || 'Failed to fetch users.');
                    }
                } catch (error) {
                    if (error.name !== 'AbortError') { // Check if the error is not from aborting the fetch
                        console.error('Error fetching users:', error);
                        setError('An error occurred while fetching users.');
                    }
                }
            } else {
                console.warn('No token found in sessionStorage or groupId is missing.');
            }
        };

        fetchUsers();

        return () => controller.abort(); // Cleanup the fetch request on component unmount
    }, [group_Id, onUsersFetched]);

    return (
        <div className='sidebar-users-container'>
            <div className='row'>
                <h3 className='group-title'>Group Info</h3>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='users-info'>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {users.length > 0 ? (
                            <ul>
                                {users.map(user => (
                                    <li key={user.user_Id}>
                                        <p>{user.userName}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
