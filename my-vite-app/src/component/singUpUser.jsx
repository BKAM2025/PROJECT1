import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/reducers/user';
import { useNavigate } from 'react-router';
import styles from './SignUpUser.module.css';

const SignUpUser = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); // Default role
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ name, mail, password, role }));
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className={styles.signup__container}>
      <div className={styles.signup__imageSection}>
        <img 
          src="https://tse3.mm.bing.net/th?id=OIP.kqtFdwUZNipAtSg7jNhh7gHaEa&pid=Api&P=0&h=180" 
          alt="Shopping Cart with Phone" 
          className={styles.signup__image}
        />
      </div>

      <div className={styles.signup__formSection}>
        <div className={styles.signup__formWrapper}>
          <h1 className={styles.signup__title}>Create an account</h1>
          <p className={styles.signup__subtitle}>Enter your details below</p>

          <form onSubmit={handleSubmit} className={styles.signup__form}>
            <div className={styles.signup__inputGroup}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.signup__input}
                required
              />
            </div>

            <div className={styles.signup__inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className={styles.signup__input}
                required
              />
            </div>

            <div className={styles.signup__inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.signup__input}
                required
              />
            </div>

            <div className={styles.signup__inputGroup}>
              <label>
                <input
                  type="radio"
                  value="client"
                  checked={role === 'client'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Client
              </label>
              <label>
                <input
                  type="radio"
                  value="seller"
                  checked={role === 'seller'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Seller
              </label>
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Admin
              </label>
            </div>

            <button
              type="submit"
              className={styles.signup__button}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Creating Account...' : 'Create Account'}
            </button>

            <button
              type="button"
              className={styles.signup__googleButton}
              onClick={() => {/* Handle Google Sign up */ }}
            >
              <img src="/google-icon.png" alt="Google" className={styles.signup__googleIcon} />
              Sign up with Google
            </button>

            <div className={styles.signup__login}>
              Already have an account?
              <a href="/" className={styles.signup__loginLink}>Log in</a>
            </div>
          </form>

          {errorMessage && (
            <div className={styles.signup__error}>{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpUser;