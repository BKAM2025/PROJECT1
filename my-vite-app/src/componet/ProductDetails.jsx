import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './navBar';
import styles from '../ProductDetails.module.css';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  
  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      navigate('/home');
      toast.error('Product not found');
    }
  }, [product, navigate]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add items to cart');
        return;
      }

      await axios.post('http://localhost:5000/api/cart/add', 
        { 
          productId: product.id,
          quantity,
          color: selectedColor,
          size: selectedSize
        },
        {
          headers: { authorization: `Bearer ${token}` }
        }
      );
      
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className={styles.pd__container}>
        <div className={styles.pd__gallery}>
          <img 
            src={product.image} 
            alt={product.name} 
            className={styles.pd__mainImage}
          />
        </div>

        <div className={styles.pd__info}>
          <h1 className={styles.pd__title}>{product.name}</h1>
          
          <div className={styles.pd__price}>
            <span className={styles.pd__currentPrice}>${product.price}</span>
            {product.originalPrice && (
              <span className={styles.pd__originalPrice}>${product.originalPrice}</span>
            )}
          </div>

          <p className={styles.pd__description}>{product.description}</p>

          <div className={styles.pd__quantity}>
            <span>Quantity:</span>
            <div className={styles.pd__quantityControls}>
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button 
            className={styles.pd__addToCart}
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <div className={styles.pd__meta}>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock} units</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;