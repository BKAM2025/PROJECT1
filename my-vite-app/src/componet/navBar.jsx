import React from "react";
// import {useNavigate } from 'react-router-dom';
  
import { Search, Heart, ShoppingCart, User } from "lucide-react";
// import "./Navbar.css"; // Import the CSS file
// const navigate = useNavigate();
const Navbar = () => {
  return (
    <nav className="navbar">
     
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>

        {/* Logout Button */}
        <a href="/" onClick={()=>{localStorage.removeItem("token"); }}>Logout</a>
      </div>

      <div className="nav-right">
      
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>

        {/* Add Product Button */}
        <a href="/addProduct" className="add-product-btn">Add Product</a>

        <a href="/favorites"><Heart size={22} className="icon" /></a>
        <a href="/cart"><ShoppingCart size={22} className="icon" /></a>
        <a href="/profile"><User size={22} className="icon" /></a>
      </div>
    </nav>
  );
};

export default Navbar;
