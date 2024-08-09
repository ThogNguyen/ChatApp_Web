import "./Register.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault(); 

        // const response = await fetch('https://localhost:7122/api/Accounts/register'){
        //     // method: 'Post',
            
        // }

        console.log({
            username,
            email,
            password,
            confirmpassword
        });
    }

    return (
        <div className="body-register">
            <div className="register-container">
                <h5 className="text-center mb-4 register-title">Register</h5>
                <form onSubmit={submit}>
                <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder="Input your username" 
                            required 
                            onChange={e => setUsername(e.target.value)}
                        />  
                    </div>
                    <div className="mb-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Input your email" 
                            required 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Input your password" 
                            required 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">  
                        <input 
                            type="password" 
                            className="form-control" 
                            id="confirmpassword" 
                            placeholder="Input your password confirm" 
                            required 
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-register w-100">Register</button>
                </form>
                <p className="mt-3 text-center">Alreeady have account?<Link className="link-to-login" to="/login"> Login</Link></p>
            </div>
        </div>
    );
}
