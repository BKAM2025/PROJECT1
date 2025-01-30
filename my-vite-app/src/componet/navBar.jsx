import React ,{useState, useEffect}from "react";
import {useNavigate } from 'react-router-dom';

import {  Heart, ShoppingCart, User } from "lucide-react";

// import "./Navbar.css"; // Import the CSS file


// const navigate = useNavigate();
const Navbar = ({products,fetch}) => {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate("");  
  const handleSearch = () => {

    if (query.trim()) {
      const resultfilter = products.filter((product) =>
        product.name.toLowerCase().includes(setQuery.toLowerCase())
      );
      setFilteredProducts(resultfilter)
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) =>
        product.CategoryId === selectedCategory
      );
    }

    return filteredProducts;
  };

  return (
   
    <nav className="navbar">
     
      <div className="nav-links">
        <a href="/home">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>

      
        <a href="/" onClick={()=>{localStorage.removeItem("token"); }}>Logout</a>
      </div>

      <div className="nav-right">
      <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by name"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={() => {handleSearch(),console.log("filter done",filteredProducts)}}>Search</button>
            </form>
         
      
        <a href="/addProduct" className="add-product-btn">Add Product</a>

        <a href="/favorites"><Heart size={22} className="icon" /></a>
        <a href="/cart"><ShoppingCart size={22} className="icon" /></a>
        <a href="/profile"><User size={22} className="icon" /></a>
       
      </div>
    </nav>
  );
};

export default Navbar;
