import React, { useState } from 'react';
import { registerUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                name,
                email,
                password,
                role,
                location: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                }
            };
            const response = await registerUser(userData);
            alert(response.data.message);
            if (role === 'admin') {
                navigate('/admin/cab-management');
            } else {
                navigate('/employee/cab-search');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                />
                <select onChange={(e) => setRole(e.target.value)} value={role} className="form-input">
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
                <input
                    type="number"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                    className="form-input"
                />
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
