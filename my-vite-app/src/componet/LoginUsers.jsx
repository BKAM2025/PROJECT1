import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import './LoginUsers.css'; // 
// Import the updated CSS file
import styles from '../Login.module.css';


function LoginUsers() {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.login);

  // State for form inputs
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(mail, password));
    try {
      console.log({ mail, password });

      var response = await axios.post(`${API_URL}/user/login`, { mail, password })
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
    <div className={styles.login__container}>
      <div className={styles.login__imageSection}>
        <img 
       src={import.meta.env.VITE_IMAGE_URL}
                alt="Shopping Cart with Phone" 
          className={styles.login__image}
        />


      </div>
      
      <div className={styles.login__formSection}>
        <div className={styles.login__formWrapper}>
          <h1 className={styles.login__title}>Log in to Exclusive</h1>
          <p className={styles.login__subtitle}>Enter your details below</p>

          <form onSubmit={handleSubmit} className={styles.login__form}>
            <div className={styles.login__inputGroup}>
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={mail}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.login__input}
                required
              />
            </div>

            <div className={styles.login__inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.login__input}
                required
              />
            </div>

            <div className={styles.login__actionRow}>
              <button 
                type="submit" 
                className={styles.login__button}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
              <a href="#" className={styles.login__forgotPassword}>
                Forgot Password?
              </a>
            </div>

            <button 
              type="button" 
              className={styles.login__googleButton}
              onClick={() => {/* Handle Google Sign in */}}
            >
              <img src="/google-icon.png" alt="Google" className={styles.login__googleIcon} />
              Sign in with Google
            </button>

            <div className={styles.login__signup}>
              Don't have an account? 
              <a href="/register" className={styles.login__signupLink}>Sign up</a>
            </div>
          </form>

          {error && <div className={styles.login__error}>{error}</div>}
        </div>
      </div>
    </div>
);
}

export default LoginUsers;
