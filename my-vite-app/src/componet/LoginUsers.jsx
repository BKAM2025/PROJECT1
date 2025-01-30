import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import './LoginUsers.css'; // Import the updated CSS file

function LoginUsers() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.login);

  // State for form inputs
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(name, password)); 
    axios.post("http://localhost:5000/api/user/login", { name, password })
      .then((response) => {
        console.log("Response", response);
        navigate("/home"); 
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src="https://i.pinimg.com/originals/23/d0/9b/23d09b613882cc096233e145dfb2cbd0.gif" alt="Login" className="login-image" />
      </div>
      <div className="form-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={() => navigate("/register")}>Create a new user</a>
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default LoginUsers;
