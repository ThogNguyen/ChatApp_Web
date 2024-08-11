import "./Register.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState(''); 
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 

    const submit = async (e) => {
        e.preventDefault(); 

        // Validate password and confirm password match
        if (password !== confirmpassword) {
            setError('Mật khẩu không khớp.');
            return;
        }

        try {
            const response = await fetch('https://localhost:7186/api/Accounts/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword: confirmpassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Đăng kí thành công! Đang chuyển hướng tới đăng nhập...');
                setError(''); 
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setSuccessMessage('');
                setError(data.Errors || 'Đăng kí thất bại.');
            }
        } catch (error) {
            setError('Có lỗi xảy ra trong quá trình đăng kí.');
            setSuccessMessage('');
        }
    }

    return (
        <div className="body-register">
            <div className="register-container">
                <h5 className="text-center mb-4 register-title">Register</h5>
                <form onSubmit={submit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
