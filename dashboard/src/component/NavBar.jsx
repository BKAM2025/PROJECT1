import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Custom styles
import { FaBars, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const name = localStorage.getItem("name")
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="d-flex align-items-center">
                    <button className="btn" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <span className="navbar-brand ml-2">Welcome {name}</span>
                </div>
            </nav>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <ul className="list-unstyled">
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/AdminDashboard">Dashboard</a></li>
                    <li><a href="/users">Buyers</a></li>
                    <li><a href="/sellers">sellers</a></li>
                    <li><a href="/category">category</a></li>
                    <li><a href="/" onClick={() => { localStorage.removeItem("token"); }}>Logout</a></li>
                </ul>
            </div>
        </div>

    );
};

export default Navbar;