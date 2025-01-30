import React from "react";
import ProductDetails from "./ProductDetails";

const ProductList = ({ products, handleOneProduct }) => {
  console.log("Received products in ProductList:", products);

  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="product-list">
      {products.map((element, i) => (
        <ProductDetails
          handleOneProduct={handleOneProduct}
          element={element}
          key={i}
        />
      ))}
    </div>
  );
};

export default ProductList;
