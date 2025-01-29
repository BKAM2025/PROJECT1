import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginUsers() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

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


  // If user is authenticated, redirect them or show a message
  // if (isAuthenticated) {
  //   return <div>Welcome back, {name}!</div>;
  // }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
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