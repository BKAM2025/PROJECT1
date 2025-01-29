import React from "react";;

const OneProduct = ({ProductList}) => (
    <div className="product-card">
    <img className="product-image" src={ProductList.image} alt={ProductList.name} />

    <div className="product-content">
        <h3 className="product-title">{ProductList.name}</h3>
        <p className="product-price">${ProductList.price}</p>
        <p className="product-description">{ProductList.description}</p>
        <p className={`product-stock ${ProductList.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {ProductList.stock > 0 ? `In Stock: ${ProductList.stock}` : "Out of Stock"}
        </p>
        
        {/* <button className="view-details-btn" onClick={() => handleOnePost(ProductList)}>
            View Details
        </button> */}
    </div>
</div>
)
export default OneProduct;