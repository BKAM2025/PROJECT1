import React, { useState,useEffect } from "react";
import { FaHeart } from 'react-icons/fa'; 
import axios from 'axios';

const OneProduct = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems, "cartItems") ;



  if (!product) {
    return <p>Product not found</p>;
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  
  

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/get/${1}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const addToCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId: '1', // Replace with actual user ID
        productId: product.id,
        quantity: 1
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
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
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
            <button className="add-to-cart-btn" onClick={()=>(addToCart())}  >Add to Cart</button>
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
