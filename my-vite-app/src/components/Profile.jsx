import React, { useState } from "react";
import Navbar from "./navBar";
import styles from './Profile.module.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // ... existing handleChange and handleSubmit functions ...

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Edit Your Profile</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputRow}>
            <div className={styles.inputField}>
              <label className={styles.label}>First Name</label>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className={styles.inputField}>
              <label className={styles.label}>Last Name</label>
              <input
                className={styles.input}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Address</label>
            <input
              className={styles.input}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>

          <div className={styles.passwordSection}>
            <h3 className={styles.passwordTitle}>Password Changes</h3>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => console.log('Cancelled')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.saveButton}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 