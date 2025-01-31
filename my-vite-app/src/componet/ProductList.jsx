import React, { useEffect } from "react";
import ProductDetails from "./ProductDetails";
import Navbar from './navBar';
import { filterProduct, filterProductByQuery } from '../store/reducers/product.js';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../ProductList.module.css';


const ProductList = ({handleOneProduct}) => {
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
    <div className={styles['fl__container']}>
        <div className={styles['fl__header']}>
            <div className={styles['fl__title-group']}>
                <span className={styles['fl__icon']}>📱</span>
                <h2 className={styles['fl__subtitle']}>Today's</h2>
                <h1 className={styles['fl__main-title']}>Flash Sales</h1>
            </div>
            <div className={styles['fl__countdown']}>
                <div className={styles['fl__time-unit']}>
                    <span className={styles['fl__digit']}>03</span>
                    <span className={styles['fl__unit-label']}>Days</span>
                </div>
                <span className={styles['fl__colon']}>:</span>
                {/* Repeat for hours, minutes, seconds */}
            </div>
        </div>
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

};

export default ProductList;
