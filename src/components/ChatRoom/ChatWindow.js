import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChatWindow.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChatWindow({ onUserAdded }) {
    const { group_Id } = useParams();

    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleAddMember = async () => {
        const token = sessionStorage.getItem('token');
        if (token && group_Id && username) {
            try {
                const response = await fetch(`https://localhost:7186/api/GroupMembers/add-people`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ group_Id, username }),
                });

                if (response.ok) {
                    const contentType = response.headers.get('Content-Type');
                    if (contentType && contentType.includes('application/json')) {
                        const newUser = await response.json();
                        // Gọi hàm cập nhật danh sách người dùng khi thành công
                        if (onUserAdded) {
                            onUserAdded(newUser);
                        }
                    } else {
                        console.warn('Expected JSON response but got', contentType);
                    }
                    setUsername('');
                } else {
                    const errorData = await response.text(); // Handle non-JSON response
                    setError(errorData || 'Failed to add member.');
                }
            } catch (error) {
                console.error('Error adding member:', error);
                setError('An error occurred while adding member.');
            }
        } else {
            console.warn('No token found in sessionStorage or groupId is missing.');
        }
    };

    return (
        <div className='chat-container'>
            <div className='chat-header'>
                <div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h3>Room 1</h3>
                            <p>10 thanh vien</p>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-primary btn-add-people mt-2" data-bs-toggle="modal" data-bs-target="#addPeopleModal">Add People</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="addPeopleModal" tabIndex="-1" aria-labelledby="addPeopleModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addPeopleModal">Search user</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="friendName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="friendName"
                                    placeholder="Input your friend name"
                                    value={username}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddMember}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='chat-content'>
                <div className='message-container'>
                    <div className='message message-left'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-right'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-left'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-right'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-left'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-right'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-left'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-right'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-left'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks!
                            </p>
                        </div>
                    </div>
                    <div className='message message-right'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    <div className='message message-right'>
                        <div className='message-body'>
                            <div>
                                <p className='message-info'>
                                    <span>15:00 PM</span> - <i>Username</i>
                                </p>
                            </div>
                            <p className='message-content'>I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='input-field'>
                <input type='text' placeholder='Type a message...' />
                <button type='button'>Send</button>
            </div>
        </div>
    );
}
