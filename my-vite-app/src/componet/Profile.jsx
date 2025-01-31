import React, { useState } from 'react';
import axios from 'axios';

function UserUpdate({ userId }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Prepare the data to be sent
    const updatedData = { name, mail, password };

    try {
      // Make PUT request to update the user
      const response = await axios.put(`http://localhost:5000/user/${Id}`, updatedData);

      // If successful, set a success message
      setMessage(response.data.message);
    } catch (err) {
      // Handle errors from API
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Show error message from API
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h1>Update Your Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your new name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="mail">Email</label>
          <input
            type="email"
            id="mail"
            placeholder="Enter your new email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update</button>
      </form>

      {/* Display success or error message */}
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
    </div>
  );
}

export default UserUpdate;
