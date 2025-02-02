import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/CategoryProducts.module.css';
import Navbar from './navBar';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);
      // Fetch products for this category
      const productsResponse = await axios.get(`http://localhost:5000/api/category/products/id/${categoryId}`);
      setProducts(productsResponse.data.data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (categoryId) {
      fetchCategoryAndProducts();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className={styles.errorContainer}>
          <p>Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.productsContainer}>
        <h2 className={styles.categoryTitle}>
          {categoryName || 'Loading category...'}
        </h2>
        <div className={styles.productsGrid}>
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>${product.price}</p>
                <p className={styles.productDescription}>
                  {product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...` 
                    : product.description}
                </p>
                <button 
                  className={styles.addToCartButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add your cart logic here
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className={styles.noProducts}>No products found in {categoryName}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;