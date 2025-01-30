import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="product-card">
      <div className="image-slider">
        <img className="product-image" src={images[currentImageIndex]} alt={element.name} />
      </div>

      <div className="product-content">
        <h3 className="product-title">{element.name}</h3>
        <p className="product-price">${element.price}</p>
        <p className="product-description">{element.description}</p>
        <p className={`product-stock ${element.stock > 0 ? "in-stock" : "out-of-stock"}`}>
          {element.stock > 0 ? `In Stock: ${element.stock}` : "Out of Stock"}
        </p>

        <button className="view-details-btn" onClick={handleClick}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
