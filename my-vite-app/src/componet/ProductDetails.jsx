import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../productDetails.css";
const ProductDetails = ({ element, handleOneProduct }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ensure there's an images array, otherwise fallback to a single image
  const images = Array.isArray(element.images) && element.images.length > 0 ? element.images : [element.image];

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  const handleClick = () => {
    handleOneProduct(element);
    navigate(`/product/${element._id}`);
  };

  return (
    <div className={styles.pd__container}>
      {/* Product Gallery */}
      <div className={styles.pd__gallery}>
        <div className={styles.pd__thumbnails}>
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`${styles.pd__thumbnail} ${currentImageIndex === index ? styles.pd__thumbnailActive : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img src={img} alt={`${element.name} view ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className={styles.pd__mainImage}>
          <img src={images[currentImageIndex]} alt={element.name} />
        </div>
      </div>
  
      {/* Product Info */}
      <div className={styles.pd__info}>
        <h1 className={styles.pd__title}>{element.name}</h1>
        
        <div className={styles.pd__rating}>
          <div className={styles.pd__stars}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.floor(element.rating) ? styles.pd__starFilled : styles.pd__star}>
                ★
              </span>
            ))}
          </div>
          <span className={styles.pd__reviews}>({element.reviews} Reviews)</span>
          {element.inStock && <span className={styles.pd__stock}>In Stock</span>}
        </div>
  
        <div className={styles.pd__price}>
          ${element.price}
        </div>
  
        <p className={styles.pd__description}>{element.description}</p>
  
        {/* Colors Selection */}
        <div className={styles.pd__colors}>
          <span className={styles.pd__label}>Colours:</span>
          <div className={styles.pd__colorOptions}>
            {element.colors?.map((color, index) => (
              <button
                key={index}
                className={styles.pd__colorBtn}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
  
        {/* Size Selection */}
        <div className={styles.pd__sizes}>
          <span className={styles.pd__label}>Size:</span>
          <div className={styles.pd__sizeOptions}>
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                className={styles.pd__sizeBtn}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
  
        {/* Quantity and Actions */}
        <div className={styles.pd__actions}>
          <div className={styles.pd__quantity}>
            <button className={styles.pd__quantityBtn}>-</button>
            <input type="text" value="2" readOnly className={styles.pd__quantityInput} />
            <button className={styles.pd__quantityBtn}>+</button>
          </div>
          <button className={styles.pd__buyBtn} onClick={handleClick}>
            Add To Cart
          </button>
          <button className={styles.pd__wishlistBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
  
        {/* Delivery Info */}
        <div className={styles.pd__delivery}>
          <div className={styles.pd__deliveryItem}>
            <span className={styles.pd__deliveryIcon}>🚚</span>
            <div className={styles.pd__deliveryInfo}>
              <h4>Free Delivery</h4>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
          </div>
          <div className={styles.pd__deliveryItem}>
            <span className={styles.pd__deliveryIcon}>↩️</span>
            <div className={styles.pd__deliveryInfo}>
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
