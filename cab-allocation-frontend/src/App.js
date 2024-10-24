// src/App.js or similar
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CabManagement from './components/Admin/CabManagement';
import CabSearch from './components/Employee/CabSearch';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/admin/cab-management" 
                    element={
                            <CabManagement />
                    } 
                />
                <Route 
                    path="/employee/cab-search" 
                    element={
                            <CabSearch />
                    } 
                />
                <Route path="/" element={<h1>Welcome to YourApp</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
