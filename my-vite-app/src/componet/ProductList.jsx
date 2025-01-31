import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import Navbar from './navBar';
import { filterProduct } from '../store/reducers/product.js';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../ProductList.module.css';
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwtDecode correctly

const ProductList = ({ handleOneProduct }) => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  
  const { products, filteredProducts, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(filterProduct());
    getUserIdFromToken(); 
  }, [dispatch]);

 
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); 

    if (!token) return;

    try {
      const decoded = jwtDecode(token); 
      if (decoded.id) {
        setCurrentId(decoded.id); 
        console.log("User ID:", decoded.id);
      } else {
        console.warn("User ID not found in token");
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

 
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token || !currentId) {
      alert("You must be logged in to add products to the cart!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/addto",
        {
          userId: currentId, 
          productId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div>
      <Navbar />
      <div className={styles['fl__container']}>
        <div className={styles['fl__header']}>
          <div className={styles['fl__title-group']}>
            <span className={styles['fl__icon']}>📱</span>
            <h2 className={styles['fl__subtitle']}>Today's</h2>
            <h1 className={styles['fl__main-title']}>Flash Sales</h1>
          </div>
        </div>
<<<<<<< HEAD
=======
        <div className={styles['fl__products-grid']}>
            {productsToDisplay.map((product) => (
                <div key={product.id} className={styles['fl__product']}>
                    <span className={styles['fl__discount-tag']}>-{product.discount}%</span>
                    <div className={styles['fl__actions']}>
                        <button className={styles['fl__action-btn']} onClick={()=>{}} >❤️</button>
                        <button className={styles['fl__action-btn']} onClick={() => handleOneProduct(product)}>👁️</button>
                    </div>
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className={styles['fl__product-image']}
                    />
                    <h3 className={styles['fl__product-title']}>{product.name}</h3>
                    <div className={styles['fl__pricing']}>
                        <span className={styles['fl__price-current']}>${product.currentPrice}</span>
                        <span className={styles['fl__price-original']}>${product.originalPrice}</span>
                    </div>
                    <div className={styles['fl__rating-wrapper']}>
                        <div className={styles['fl__stars']}>⭐⭐⭐⭐⭐</div>
                        <span className={styles['fl__review-count']}>({product.reviews})</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </div>
);
>>>>>>> 0b9ac64c06da9b7e49ac65cb4cc1811de7adccbf

        <div className={styles['fl__products-grid']}>
          {productsToDisplay.map((product) => (
            <div key={product.id} className={styles['fl__product']}>
              <span className={styles['fl__discount-tag']}>-{product.discount}%</span>
              <div className={styles['fl__actions']}>
                <button className={styles['fl__action-btn']}>❤️</button>
                <button className={styles['fl__action-btn']} onClick={() => handleOneProduct(product)}>👁️</button>
              </div>
              <img src={product.image} alt={product.name} className={styles['fl__product-image']} />
              <h3 className={styles['fl__product-title']}>{product.name}</h3>
              <div className={styles['fl__pricing']}>
                <span className={styles['fl__price-current']}>${product.currentPrice}</span>
                <span className={styles['fl__price-original']}>${product.originalPrice}</span>
              </div>
              <div className={styles['fl__rating-wrapper']}>
                <div className={styles['fl__stars']}>⭐⭐⭐⭐⭐</div>
                <span className={styles['fl__review-count']}>({product.reviews})</span>
              </div>

              {/* 🛒 Add to Cart Button */}
              <button className={styles['fl__add-to-cart']} onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
