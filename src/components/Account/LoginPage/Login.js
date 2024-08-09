import "./Login.css";
import React from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {

    return (
        <div className="body-login">
            <div className="login-container">
                <h5 className="text-center mb-4 login-title">Login</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Input your email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Input your password" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-login w-100">Login</button>
                </form>
                <p className="mt-3 text-center">Don't have account? 
                    <Link className="link-to-register" to="/register"> Register</Link>
                </p>
            </div>
        </div>
    );
}
