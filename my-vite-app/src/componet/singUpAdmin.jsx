import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/reducers/adminAUth'; // Import the loginUser thunk

function LoginPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ mail: "", password: "" });
  const { loading, error, user } = useSelector((state) => state.auth); // Access loading, error, and user state

  useEffect(() => {
    if (user) {
      window.alert('Login successful!'); // Navigate to SingUpUser after successful login
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData)); // Dispatch the loginUser thunk
  };

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#333" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <form onSubmit={handleLogin}>
                      <p>Please login to your account</p>
                      {error && typeof error === 'string' && (
                        <p className="text-danger">{error}</p>
                      )}
                      {error && typeof error === 'object' && error.message && (
                        <p className="text-danger">{error.message}</p>
                      )}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          e-mail
                        </label>
                        <input
                          type="mail"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Phone number or mail address"
                          value={loginData.mail}
                          onChange={(e) => setLoginData({ ...loginData, mail: e.target.value })}
                        />
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
