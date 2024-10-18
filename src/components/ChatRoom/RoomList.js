import React, { useEffect, useState } from 'react';
import './RoomList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function RoomList() {

    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');
    const [inputError, setInputError] = useState('');
    const [roomName, setRoomName] = useState('');
    

    const fetchUserGroup = async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        if (token) {
            try {
                const response = await fetch(`https://localhost:7186/api/GroupMembers/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setGroups(Array.isArray(data) ? data : []); 
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Lấy danh sách nhóm thât bại.');
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                setError('Failed to decode token.');
            }
        } else {
            console.warn('No token found in sessionStorage.');
        }
    };

    useEffect(() => {
        fetchUserGroup();
    }, []);

    const createGroup = async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        if (token && roomName && userId) {
            try {
                const response = await fetch(`https://localhost:7186/api/Groups?userId=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ groupName: roomName }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setGroups(prevGroups => [...prevGroups, result]); // Update the groups
                    setRoomName('');

                    fetchUserGroup(); // Reload the groups
                } else {
                    const errorData = await response.json();
                    setInputError(errorData.message || 'Không thể tạo nhóm.');
                }
            } catch (error) {
                console.error('Lỗi khi tạo nhóm:', error);
                setInputError('Lỗi khi tạo nhóm');
            }
        } else {
            console.warn('Thiếu tên group hoặc id người dùng.');
        }
    };


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
                                    group.group_Id ? (
                                        <li key={group.group_Id}>
                                            <Link to={`/${group.group_Id}`}>{group.groupName}</Link>
                                        </li>
                                    ) : null
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
                                {inputError && <div className="alert alert-danger">{inputError}</div>}
                                <input
                                    type="text"
                                    className="form-control"
                                    id="roomName"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    placeholder="Enter room name"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={createGroup}>Create Room</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
