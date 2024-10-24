import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar bg-gray-800 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="nav-links flex space-x-6">
                    <Link to="/login" className="nav-item text-white hover:text-gray-400">
                        Login
                    </Link>
                    <Link to="/register" className="nav-item text-white hover:text-gray-400">
                        Register
                    </Link>
                    <Link to="/admin/cab-management" className="nav-item text-white hover:text-gray-400">
                        Cab Management
                    </Link>
                    <Link to="/employee/cab-search" className="nav-item text-white hover:text-gray-400">
                        Cab Search
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
