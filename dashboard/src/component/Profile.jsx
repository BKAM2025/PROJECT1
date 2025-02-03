import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import '../App.css';
import Footer from './Footer';
import { jwtDecode } from "jwt-decode"
import { FaTrash, FaEdit } from 'react-icons/fa'
import axios from "axios"
const Profile = () => {
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        mail: '',
        address: '',
        lastname: '',
    });
    const firstLetter = profile.name?.trim().charAt(0).toUpperCase() || '?'
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                const decoded = jwtDecode(token);
                const response = await axios.get(`http://localhost:5000/api/admin/${decoded.id}`);
                setProfile(response.data);
                setEditData({
                    name: response.data.name,
                    mail: response.data.mail,
                    address: response.data.address,
                    lastname: response.data.lastname,
                });
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };

        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/admin/${profile.id}`, editData);
            setProfile(editData);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="profile-img-circle" role="img" aria-label="User profile initial">
                    <div className="profile-letter">{firstLetter}</div>
                </div>
                <div>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={editData.mail}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={editData.lastname}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={editData.address}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className="form-control"
                        />
                    </div>
                </div>
                <span>                <FaEdit onClick={isEditing ? handleSave : handleEditClick} />
                    {isEditing ? 'Save' : 'Edit Profile'}</span>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;

