import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProductByQuery } from '../store/reducers/product.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");  // State to hold the search query

  // Handle search query change and prevent form submission on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission (page refresh)
      dispatch(filterProductByQuery(query));  // Dispatch the filterProductByQuery action
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="/home">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>
        <a href="/" onClick={() => { localStorage.removeItem("token"); }}>Logout</a>
      </div>

      <div className="nav-right">
        <form className="d-flex" role="search">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}  // Update query state
            onKeyDown={handleKeyDown}  // Prevent form submission and handle "Enter"
            placeholder="Search products..."
          />
        </form>

        <a href="/addProduct" className="add-product-btn">Add Product</a>
      </div>
    </nav>
  );
};

export default Navbar;
