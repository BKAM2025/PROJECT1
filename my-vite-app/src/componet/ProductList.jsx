import React, { useEffect } from "react";
import ProductDetails from "./ProductDetails";
import Navbar from './navBar';
import { filterProduct, filterProductByQuery } from '../store/reducers/product.js';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();

  // Get products, filteredProducts, loading, and error from Redux state
  const { products, filteredProducts, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    console.log("start");
    dispatch(filterProduct()); // Dispatch the filterProduct action to fetch all products
  }, [dispatch]);

  // Render loading state
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Render error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Handle keydown event for "Enter"


  // Use filteredProducts if you want the filtered data, otherwise use products
  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div>
      <Navbar />
      <div className="search-bar">
*
      </div>
      <div className="product-list">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <ProductDetails key={product.id} element={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
