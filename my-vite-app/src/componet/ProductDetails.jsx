import React from "react";

const ProductDetails = ({ element, handleOneProduct }) => {
    console.log("postD", element, handleOneProduct);

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
                
                <button className="view-details-btn" onClick={() =>handleOneProduct(element)}>
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
