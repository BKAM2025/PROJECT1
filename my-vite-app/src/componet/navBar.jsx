import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProductByQuery } from '../store/reducers/product.js';
import { Heart, ShoppingCart, User } from "lucide-react"
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(filterProductByQuery(query));
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="/home">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">AboutUs</a>
        <a href="/" onClick={() => { localStorage.removeItem("token"); }}>Logout</a>
      </div>

      <div className="nav-right">
        <form className="d-flex" role="search">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
          />
        </form>

        <a href="/addProduct" className="add-product-btn">Add Product</a>
        <a href="/favorites"><Heart size={22} className="icon" onClick={() => { navigate("/favorites") }} /></a>
        <a href="/cart"><ShoppingCart size={22} className="icon" /></a>
        <a href="/profile"><User size={22} className="icon" /></a>
      </div>
    </nav>
  );
};

export default Navbar;
