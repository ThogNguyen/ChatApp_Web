import React from 'react';
import './RoomList.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

export default function RoomList() {
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
                        <a href="/chatroom">Room 1</a>
                        <a href="/chatroom">Room 2</a>
                        <a href="/chatroom">Room 3</a>

                        <button className="btn btn-primary btn-create-group mt-3" data-bs-toggle="modal" data-bs-target="#createRoomModal">Create Group</button>
                    </div>
                </div>
            </div>
            {/* Modal */}
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