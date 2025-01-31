import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Import the updated CSS file
import styles from '../Login.module.css';


function LoginUsers() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error: authError } = useSelector((state) => state.login);

  // State for form inputs
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    dispatch(login(mail, password))
      .then(() => {
        if (!isAuthenticated) {
          setError("Authentication failed. Please check your credentials.");
        }
      })
      .catch(err => {
        setError("An error occurred during login. Please try again.");
      });
=======
    await dispatch(login(mail, password));
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
>>>>>>> 0b9ac64c06da9b7e49ac65cb4cc1811de7adccbf
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    } else if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, authError, navigate]);


  // If user is authenticated, redirect them or show a message
  // if (isAuthenticated) {
  //   return <div>Welcome back, {name}!</div>;
  // }

  return (
    <div className={styles.login__container}>
      <div className={styles.login__imageSection}>
        <img
          src="/path-to-your-shopping-image.jpg"
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
              onClick={() => {/* Handle Google Sign in */ }}
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
