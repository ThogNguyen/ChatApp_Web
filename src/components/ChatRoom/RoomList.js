import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './RoomList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Link } from 'react-router-dom';

export default function RoomList() {

    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserGroup = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userIdClaim = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
                    setUserId(userIdClaim || '');

                    // Fetch the user's groups
                    const response = await fetch(`https://localhost:7186/api/GroupMembers/user/${userIdClaim}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setGroups(data);
                    } else {
                        const errorData = await response.json();
                        setError(errorData.error || 'Failed to fetch groups.');
                    }

                } catch (error) {
                    console.error('Token decoding failed:', error);
                }
            } else {
                console.warn('No token found in sessionStorage.');
            }
        };
        fetchUserGroup();
    }, []);



    return (
        <div className="accordion custom-accordion" id="accordionExample">
            <div className="accordion-item custom-accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        List Group
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show custom-accordion-body" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        {groups.length > 0 ? (
                            <ul className='list-groups'>
                                {groups.map(group => (
                                    <li key={group.group_Id}> 
                                        <Link to={`/${group.group_Id}`}>{group.groupName}</Link>   
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No groups found.</p>
                        )}
                        <button className="btn btn-primary btn-create-group mt-3" data-bs-toggle="modal" data-bs-target="#createRoomModal">Create Group</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="createRoomModal" tabIndex="-1" aria-labelledby="createRoomModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createRoomModalLabel">Create New Room</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="roomName" className="form-label">Room Name</label>
                                <input type="text" className="form-control" id="roomName" placeholder="Enter room name" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Create Room</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
