import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProductByQuery } from '../store/reducers/product.js';
import { Heart, ShoppingCart, User, Search ,PlusCircle} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(filterProductByQuery(query));
      e.preventDefault();
      dispatch(filterProductByQuery(query));
    }
  };

  return (
    <nav className={styles.navbar}>
      <a href="/home" className={styles.logo}>
        Exclusive
      </a>

      <div className={styles['nav-center']}>
        <a href="/home">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>
        <a href="/" onClick={() => localStorage.clear()}>Sign Up</a>
      </div>

      <div className={styles['nav-right']}>
      <PlusCircle
            size={24}
            className={styles.icon}
            onClick={() => navigate("/addProduct")}
          />
        <div className={styles['search-container']}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What are you looking for?"
            className={styles['search-input']}
          />
          <button className={styles['search-button']}>
          
            <Search size={20} />
          </button>
        </div>

        <div className={styles['nav-icons']}>
          <Heart 
            size={24} 
            className={styles.icon}
            onClick={() => navigate("/favorites")}
          />
          <ShoppingCart 
            size={24} 
            className={styles.icon}
            onClick={() => navigate("/cart")}
          />
          <User 
            size={24} 
            className={styles.icon}
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;