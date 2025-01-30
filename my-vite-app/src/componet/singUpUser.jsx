import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/reducers/user';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SingUpUser = () => {
const SingUpUser = () => {

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch(registerUser([name, mail, password]));
      axios.post('http://localhost:5000/api/user/register', {
        name,
        mail,
        password
      })
      then(() => navigate("/home"))
    }
    catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
      }
    };
  };





  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error.message || error}</p>}
    </div>
  );
};}

export default SingUpUser;
