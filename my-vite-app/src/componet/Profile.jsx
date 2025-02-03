import React,{useState} from "react";
import Navbar from "./navBar"
import styles from '../Profile.module.css';
const Profile=()=>{
  const API_URL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your API call here to update the profile
        console.log('Form submitted:', formData);
      };
    
      return (
        <div>
          <Navbar />
          <div className={styles.profile__container}>
            <h2 className={styles.profile__title}>Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className={styles.profile__form}>
              <div className={styles.profile__input_row}>
                <div className={styles.profile__input_field}>
                  <label className={styles.profile__label} htmlFor="firstName">First Name</label>
                  <input
                    className={styles.profile__input}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className={styles.profile__input_field}>
                  <label className={styles.profile__label} htmlFor="lastName">Last Name</label>
                  <input
                    className={styles.profile__input}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>
    
              <div className={styles.profile__input_group}>
                <label className={styles.profile__label} htmlFor="email">Email</label>
                <input
                  className={styles.profile__input}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
    
              <div className={styles.profile__input_group}>
                <label className={styles.profile__label} htmlFor="address">Address</label>
                <input
                  className={styles.profile__input}
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </div>
    
              <div className={styles.profile__password_section}>
                <h3 className={styles.profile__password_title}>Password Changes</h3>
                <div className={styles.profile__input_group}>
                  <input
                    className={styles.profile__input}
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Current Password"
                  />
                </div>
                <div className={styles.profile__input_group}>
                  <input
                    className={styles.profile__input}
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                  />
                </div>
                <div className={styles.profile__input_group}>
                  <input
                    className={styles.profile__input}
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                  />
                </div>
              </div>
    
              <div className={styles.profile__button_group}>
                <button 
                  type="button" 
                  className={`${styles.profile__button} ${styles['profile__button--cancel']}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`${styles.profile__button} ${styles['profile__button--save']}`}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}


export default Profile ;