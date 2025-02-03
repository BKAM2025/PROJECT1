import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import axios from "axios";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
import { jwtDecode } from 'jwt-decode'
const StatCard = ({ title, count, icon, loading }) => {
    const [hovered, setHovered] = useState(false);
    const [displayCount, setDisplayCount] = useState(0);
    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => {
                setDisplayCount(prev => {
                    const diff = count - prev;
                    if (diff > 0) return Math.min(prev + Math.ceil(diff * 0.1), count);
                    clearInterval(interval);
                    return count;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [count, loading]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="col-md-4 mb-4"
        >
            <div className="card border-0 shadow-sm h-100 hover-glow">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="me-4">
                        {loading ? (
                            <Skeleton variant="text" width={100} height={70} />
                        ) : (
                            <h2 className="display-4 fw-bold text-pink mb-0">
                                {displayCount.toLocaleString()}
                            </h2>
                        )}
                        {loading ? (
                            <Skeleton variant="text" width={150} height={30} />
                        ) : (
                            <p className="custom-text mb-0 text-uppercase small fw-medium text-pink">
                                {title}
                            </p>
                        )}
                    </div>
                    <motion.div
                        animate={{ y: hovered ? -5 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="icon-wrapper bg-pink rounded-circle p-3"
                    >
                        {loading ? (
                            <Skeleton variant="circular" width={40} height={40} />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="currentColor"
                                className="bi bi-person text-white"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const AdminDashboard = () => {
    const [seller, setSeller] = useState([]);
    const [buyer, setBuyer] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idy, setId] = useState(0)
    const [profile, setProfile] = useState("")
    const token = localStorage.getItem("token")
    const fetchData = async () => {
        try {
            const [sellersRes, buyersRes, usersRes] = await Promise.all([
                axios.get("http://localhost:5000/api/admin/allSeller"),
                axios.get("http://localhost:5000/api/admin/allBuyer"),
                axios.get("http://localhost:5000/api/admin/all")
            ]);

            setSeller(sellersRes.data);
            setBuyer(buyersRes.data);
            setUsers(usersRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setLoading(false);
        }
    };
    const OneProfile = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/admin/${id}`)
            setProfile(result.data)
        } catch (err) {
            console.log("err", err)
        }
    }
    useEffect(() => {
        const decoded = jwtDecode(token)
        setId(decoded.id)
        fetchData();
    }, []);
    OneProfile(idy)
    localStorage.setItem('name', profile.name)
    return (
        <div className="dashboard-container">
            <Navbar profile={profile} />
            <div className="container py-5">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="row justify-content-center"
                >
                    <StatCard
                        title="All Users"
                        count={users.length}
                        loading={loading}
                    />
                    <StatCard
                        title="Clients"
                        count={buyer.length}
                        loading={loading}
                    />
                    <StatCard
                        title="Sellers"
                        count={seller.length}
                        loading={loading}
                    />
                </motion.div>

                {/* Add more animated sections here */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="row mt-5"
                >
                </motion.div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard
