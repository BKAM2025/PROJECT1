import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // State for form inputs
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(name, password)); // Dispatch login action
  };

  // If user is authenticated, redirect them or show a message
  if (isAuthenticated) {
    return <div>Welcome back, {name}!</div>;
  }

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

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default LoginPage;
