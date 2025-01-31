import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../productDetails.css";

const ProductDetails = ({ element, handleOneProduct, addToCart }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ensure there's an images array, otherwise fallback to a single image
  const images = Array.isArray(element.images) && element.images.length > 0 ? element.images : [element.image];

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleClick = () => {
    handleOneProduct(element);
    navigate(`/product/${element._id}`);
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    const cartItem = {
      productId: element._id,
      name: element.name,
      price: element.price,
      image: element.image,
      quantity: 1, // Default to 1, can be changed
    };

    addToCart(cartItem); // Call parent function or global state function
    alert(`${element.name} added to cart!`);
  };

  return (
    <div className="pd__container">
      {/* Product Gallery */}
      <div className="pd__gallery">
        <div className="pd__thumbnails">
          {images.map((img, index) => (
            <div
              key={index}
              className={`pd__thumbnail ${currentImageIndex === index ? "pd__thumbnailActive" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img src={img} alt={`${element.name} view ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="pd__mainImage">
          <img src={images[currentImageIndex]} alt={element.name} />
        </div>
      </div>

      {/* Product Info */}
      <div className="pd__info">
        <h1 className="pd__title">{element.name}</h1>

        <div className="pd__rating">
          <div className="pd__stars">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.floor(element.rating) ? "pd__starFilled" : "pd__star"}>
                ★
              </span>
            ))}
          </div>
          <span className="pd__reviews">({element.reviews} Reviews)</span>
          {element.inStock && <span className="pd__stock">In Stock</span>}
        </div>

        <div className="pd__price">${element.price}</div>

        <p className="pd__description">{element.description}</p>

        {/* Colors Selection */}
        <div className="pd__colors">
          <span className="pd__label">Colours:</span>
          <div className="pd__colorOptions">
            {element.colors?.map((color, index) => (
              <button key={index} className="pd__colorBtn" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="pd__sizes">
          <span className="pd__label">Size:</span>
          <div className="pd__sizeOptions">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button key={size} className="pd__sizeBtn">
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="pd__actions">
          <div className="pd__quantity">
            <button className="pd__quantityBtn">-</button>
            <input type="text" value="1" readOnly className="pd__quantityInput" />
            <button className="pd__quantityBtn">+</button>
          </div>

          {/* Add to Cart Button */}
          <button className="pd__buyBtn" onClick={handleAddToCart}>
            Add To Cart 🛒
          </button>

          <button className="pd__wishlistBtn">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        {/* Delivery Info */}
        <div className="pd__delivery">
          <div className="pd__deliveryItem">
            <span className="pd__deliveryIcon">🚚</span>
            <div className="pd__deliveryInfo">
              <h4>Free Delivery</h4>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
          </div>
          <div className="pd__deliveryItem">
            <span className="pd__deliveryIcon">↩️</span>
            <div className="pd__deliveryInfo">
              <h4>Return Delivery</h4>
              <p>Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
