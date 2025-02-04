import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Navbar from "./navBar";

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  console.log(favoriteProducts,"👌👌")

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
    
      const response = await axios.get(`http://localhost:5000/api/isFavorite/favorites`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      console.log("Fetched favorite products:", response.data);
      
      setFavoriteProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch favorite products:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Favorite Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {favoriteProducts.map((product) => (
          
          <div key={product.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            width: '200px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;