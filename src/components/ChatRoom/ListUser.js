import React from 'react';
import './ListUser.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListUser() {
    return (
        <>
            <div className='sidebar-users-container'>
                <div className='row'>
                    <h3 className='group-title'>Group Info</h3>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='users-info'>
                            <ul>
                                <li>
                                    <p>Nguyen Van A</p>
                                </li>
                                <li>
                                    <p>Nguyen Van b</p>
                                </li>
                                <li>
                                    <p>Nguyen Van C</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
