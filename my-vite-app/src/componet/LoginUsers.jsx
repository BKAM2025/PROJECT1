import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import './LoginUsers.css'; // Import the updated CSS file

function LoginUsers() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.login);

  // State for form inputs
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(mail, password));
    try {
      console.log({ mail, password });

      var response = await axios.post("http://localhost:5000/api/user/login", { mail, password })
      console.log(response);
      localStorage.setItem("token", response.data.user.token)
      navigate("/home");
    }
    catch (error) {
      throw error
    }
  };


  // If user is authenticated, redirect them or show a message
  // if (isAuthenticated) {
  //   return <div>Welcome back, {name}!</div>;
  // }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">mail</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your username"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="text-center mt-3">
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={() => navigate("/register")}>Create a new user</a>
        </p>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>

  );
}

export default LoginUsers;
