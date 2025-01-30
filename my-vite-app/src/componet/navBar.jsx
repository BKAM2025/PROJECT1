import React from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
// import "./Navbar.css"; // Import the CSS file


const Navbar = () => {
  return (
   
    <nav className="navbar">
     
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>

      </div>

      <div className="nav-right">
        {/* Search */}
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>

     
        <a href="/favorites"><Heart size={22} className="icon" /></a>
        <a href="/cart"><ShoppingCart size={22} className="icon" /></a>
        <a href="/profile"><User size={22} className="icon" /></a>
       
      </div>
    </nav>
  );
};

export default Navbar;