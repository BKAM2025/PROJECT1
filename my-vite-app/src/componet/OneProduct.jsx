import React, { useState, useEffect } from "react";
import { FaHeart } from 'react-icons/fa'; 
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { use } from "react";
// import { head } from "../../../back-end/routers/product.router";

// import getUserIdFromToken from "../middlwares/getIdFromToken";

const OneProduct = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [cartItems, setCartItems] = useState([]);
  const [userRating, setUserRating] = useState(0); // User's rating (out of 5)
  const [reviewComment, setReviewComment] = useState(''); // Comment for the review

  console.log(cartItems, "cartItems");

  useEffect(() => {
    fetchCartItems();
    getUserIdFromToken();
  }, []);

  if (!product) {
    return <p>Product not found</p>;
  }

  const toggleFavorite = async () => {
    try {
      await axios.put(`http://localhost:5000/api/product/${product.id}/favorite`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }, {
        productId: product.id
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
    }
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

  // Handle Star Rating
  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleReviewSubmit = async () => {
    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        productId: product.id,
        rating: userRating,
        comment: reviewComment,
        userId: currentId, // Assuming you have the user ID
      });
      alert('Review submitted');
    } catch (error) {
      console.error('Failed to submit review:', error);
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
          <p className={`product-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}></p>

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
            <button className="add-to-cart-btn" onClick={() => addToCart(product.id)}>Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
          
          {/* Star rating input for review */}
          <div className="review-section">
            <h3>Rate this product</h3>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={`star ${userRating >= rating ? 'selected' : ''}`}
                  onClick={() => handleStarClick(rating)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Leave a comment (optional)"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
            <button onClick={handleReviewSubmit}>Submit Review</button>
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
