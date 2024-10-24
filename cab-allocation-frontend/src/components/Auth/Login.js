
import React, { useState } from 'react';
import { loginUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            alert('Login successful');
            // Redirect based on role
            if (response.data.role === 'admin') {
                navigate('/admin/cab-management');
            } else {
                navigate('/employee/cab-search');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
