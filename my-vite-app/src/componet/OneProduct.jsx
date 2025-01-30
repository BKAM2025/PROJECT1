import React, { useState } from "react";
import { FaHeart } from 'react-icons/fa'; 

const OneProduct = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return <p>Product not found</p>;
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
            <button className="add-to-cart-btn">Add to Cart</button>
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
