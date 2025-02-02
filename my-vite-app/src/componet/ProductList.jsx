import React, { useEffect, useState } from "react";
import Navbar from './navBar';
import Categories from './Categories';
import Slider from './Slider';
import { useNavigate } from 'react-router-dom';
import { filterProduct, filterProductByQuery } from '../store/reducers/product.js';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../ProductList.module.css';
import  axios from 'axios';
import { toast } from 'react-toastify';
const ProductList = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});
  const handleViewDetails = (product) => {
    navigate(`/productDetails/${product.id}`, { state: { product } });
  };
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add items to cart');
        return;
      }

      await axios.post('http://localhost:5000/api/cart/add', 
        { 
          productId,
          quantity: 1
        },
        {
          headers: { authorization: `Bearer ${token}` }
        }
      );
      
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error(error.response?.data?.message || 'Failed to add item to cart');
    }
  };
  const dispatch = useDispatch();
console.log("start");
  // Get products, filteredProducts, loading, and error from Redux state
  const { products, filteredProducts, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    console.log("start");
    dispatch(filterProduct()); // Dispatch the filterProduct action to fetch all products
    fetchFavoriteStatus();
  }, [dispatch]);

  const fetchFavoriteStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/isFavorite/favorites`, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const favoritesMap = {};
      response.data.forEach(product => {
        favoritesMap[product.id] = true;
      });
      setFavorites(favoritesMap);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };
  
  // Render loading state
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Render error state
  if (error) {
    return <p>Error: {error}</p>;
  }
  const toggleFavorite = async (product) => {
    try {
      await axios.put(`http://localhost:5000/api/isFavorite/${product.id}`, {}, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Toggle the favorite status locally
      setFavorites(prev => ({
        ...prev,
        [product.id]: !prev[product.id]
      }));
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
    }
  };

  // Handle keydown event for "Enter"


  // Use filteredProducts if you want the filtered data, otherwise use products
  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : products;

  return (

    <div>
    <Navbar />
    <div className={styles.mainContainer}>
        <aside className={styles.sidebar}>
          <Categories />
        </aside>
        <main className={styles.content}>
          <Slider />
          
        </main>
      </div>
    <div className={styles['fl__container']}>
        <div className={styles['fl__header']}>
            <div className={styles['fl__title-group']}>
                <span className={styles['fl__icon']}>📱</span>
                <h2 className={styles['fl__subtitle']}>Todays</h2>
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
                    <span className={styles['fl__discount-tag']}>-{20}%</span>
                    <div className={styles['fl__actions']}>
                    <button 
                      className={`${styles['fl__action-btn']} ${favorites[product.id] ? styles['fl__favorite-active'] : ''}`} 
                      onClick={() => toggleFavorite(product)}
                    >
                      {favorites[product.id] ? '❤️' : '🤍'}
                    </button>
                       
                        <button className={styles['fl__action-btn']} onClick={() => handleViewDetails(product)}>👁️</button>
                        <button 
                  className={styles['fl__action-btn']}
                  onClick={() => addToCart(product.id)}
                >
                  🛒
                </button>
                    </div>
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className={styles['fl__product-image']}
                    />
                    <h3 className={styles['fl__product-title']}>{product.name}</h3>
                    <div className={styles['fl__pricing']}>
                        <span className={styles['fl__price-current']}>${Math.round(product.price*0.8)}</span>
                        <span className={styles['fl__price-original']}>${product.price}</span>
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
