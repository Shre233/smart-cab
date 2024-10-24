import React, { useState, useEffect } from 'react';
import { registerCab, getCabs } from '../../api';
import './CabManagement.css'; 

const CabManagement = () => {
    const [cabs, setCabs] = useState([]);
    const [cabId, setCabId] = useState('');
    const [driverName, setDriverName] = useState('');
    const [location, setLocation] = useState({ lat: '', lng: '' });

    const handleRegisterCab = async (e) => {
        e.preventDefault();
        try {
            const response = await registerCab({ cab_id: cabId, driver_name: driverName, location });
            alert(response.data.message);
            fetchCabs(); // Refresh cab list
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const fetchCabs = async () => {
        try {
            const response = await getCabs();
            setCabs(response.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchCabs();
    }, []);

    return (
        <div className="cab-management-container">
            <h2 className="title">Cab Management</h2>
            <form onSubmit={handleRegisterCab} className="cab-form">
                <input type="text" placeholder="Cab ID" className="form-input" onChange={(e) => setCabId(e.target.value)} required />
                <input type="text" placeholder="Driver Name" className="form-input" onChange={(e) => setDriverName(e.target.value)} required />
                <input type="number" placeholder="Latitude" className="form-input" onChange={(e) => setLocation({ ...location, lat: e.target.value })} required />
                <input type="number" placeholder="Longitude" className="form-input" onChange={(e) => setLocation({ ...location, lng: e.target.value })} required />
                <button type="submit" className="submit-button">Register Cab</button>
            </form>
            <h3 className="cab-list-title">All Cabs</h3>
            <ul className="cab-list">
                {cabs.map((cab) => (
                    <li key={cab.cab_id} className="cab-item">
                        {cab.driver_name} <span className={`cab-status ${cab.status.toLowerCase()}`}>{cab.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CabManagement;
