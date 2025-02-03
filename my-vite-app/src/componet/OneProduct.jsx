import React, { useState,useEffect } from "react";
import { FaHeart } from 'react-icons/fa'; 
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import { use } from "react";
// import { head } from "../../../back-end/routers/product.router";

// import getUserIdFromToken from "../middlwares/getIdFromToken";

const OneProduct = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite)
  const [cartItems, setCartItems] = useState([]);
  
  console.log(cartItems, "cartItems") ;


  useEffect(() => {
    fetchCartItems();
    getUserIdFromToken()
  }, []);


  if (!product) {
    return <p>Product not found</p>;
  }

  const toggleFavorite = async () => {
    try {
      await axios.put(`${API_URL}/product/${product.id}/favorite`, { productId: product.id },{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}, {
       

        productId: product.id
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart/get`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }

  };

  const addToCart = async (productId) => {
    try {
      await axios.post(`${API_URL}/cart/add`, {
        userId: currentId,    
        productId: productId,
      });
      alert('Product added to cart');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  
  const generateStarRating = (rating) => {
  
    const validRating = isNaN(rating) || rating < 0 ? 0 : Math.min(rating, 5); // Default to 0 or clamp to 5
  
    const totalStars = 5;
    const filledStars = Math.floor(validRating);
    const emptyStars = totalStars - filledStars;
  
    return (
      <div className="star-rating">
        {[...Array(filledStars)].map((_, index) => (
          <span key={index} className="filled-star">★</span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="empty-star">★</span>
        ))}
      </div>
    );
  };
  
  return (
    <div className="product-container">
      <div className="product-content">
        <div className="product-image-container">
          <img className="product-image" src={product.image} alt={product.name} />
        </div>

        <div className="product-details">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">${product.price}</p>

          <div className="product-rating">
            {generateStarRating(product.rating)}
            <span className="rating-count">({product.reviews} reviews)</span>
          </div>

          <p className="product-description">{product.description}</p>
          <p className={`product-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
          </p>

          <div className="favorite-btn">
            <FaHeart
              className={`heart-icon ${isFavorite ? "favorite" : ""}`}
              onClick={toggleFavorite}
            />
          </div>

          <div className="free-delivery">
            <span>Free Delivery</span>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={()=>(addToCart(product.id))}  >Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>

     
      <footer className="footer">
        <div className="footer-content">
          <img src="https://media1.giphy.com/media/5YpDAIRBS2xJMBoF2p/giphy-preview.gif" alt="" />
        </div>
      </footer>
    </div>
  );
};

export default OneProduct;
