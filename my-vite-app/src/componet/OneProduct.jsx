import React, { useState,useEffect } from "react";
import { FaHeart } from 'react-icons/fa'; 
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import { use } from "react";

// import getUserIdFromToken from "../middlwares/getIdFromToken";

const OneProduct = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [currentId, setCurrent] = useState(null);
  console.log(cartItems, "cartItems") ;

  const getUserIdFromToken = async() => {
    
    try {
      const token = await localStorage.getItem('token')
      console.log( "token👌👌",token);
      
      if (!token) return null;
      const {id} =await jwtDecode(token);
      setCurrent(id)
    console.log( "my id👌👌",id);

 
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  

  
  

  useEffect(() => {
    fetchCartItems();
    getUserIdFromToken()
  }, []);

  console.log("❤️❤️❤️",currentId)
  if (!product) {
    return <p>Product not found</p>;
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/get`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
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
