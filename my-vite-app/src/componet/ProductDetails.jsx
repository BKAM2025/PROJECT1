import React from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ element, handleOneProduct }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    handleOneProduct(element); // Set the selected product
    navigate(`/product/${element._id}`); // Navigate to the details page
  };

  return (
    <div className="product-card">
      <img className="product-image" src={element.image} alt={element.name} />

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
