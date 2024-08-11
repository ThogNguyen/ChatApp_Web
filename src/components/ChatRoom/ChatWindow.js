import React from 'react';
import './ChatWindow.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChatWindow() {
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
                                <input type="text" className="form-control" id="friendName" placeholder="Input your friend name" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Add</button>
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
