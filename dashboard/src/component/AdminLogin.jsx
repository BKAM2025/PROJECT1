// src/components/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { login } from "../store/reducers/adminAUth"; // Ensure this import is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
const AdminLogins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.login);

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); // Dispatch login thunk with correct payload
  };

  useEffect(() => {
    if (!isAuthenticated) {
      <div>{error}</div>; // Log success message to console
    } else if (isAuthenticated) {
      navigate('/AdminDashboard');
    }
  }, [isAuthenticated]);


  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow-lg">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="email">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="pass">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


export default AdminLogins;
