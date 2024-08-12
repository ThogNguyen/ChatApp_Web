import "./Login.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7186/api/Accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('token', data.token);
                setSuccessMessage('Đăng nhập thành công! Đang chuyển hướng...');
                setError('');
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError(data.error || 'Đăng nhập thất bại.');
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi đăng nhập.');
        }
    };

    return (
        <div className="body-login">
            <div className="login-container">
                <h5 className="text-center mb-4 login-title">Login</h5>
                <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Email</label>
                        <input
                            type="username"
                            className="form-control"
                            id="username"
                            placeholder="Input your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Input your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
