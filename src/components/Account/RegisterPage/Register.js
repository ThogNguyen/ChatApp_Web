import "./Register.css"
import React from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    return (
        <div className="body-register">
            <div className="register-container">
                <h5 className="text-center mb-4 register-title">Register</h5>
                <form>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="email" placeholder="Input your email" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" placeholder="Input your password" required />
                    </div>
                    <div className="mb-3">  
                        <input type="password" className="form-control" id="password" placeholder="Input your password confirm" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-register w-100">Register</button>
                </form>
                <p className="mt-3 text-center">Alreeady have account?<Link className="link-to-login" to="/"> Login</Link></p>
            </div>
        </div>
    );
}
