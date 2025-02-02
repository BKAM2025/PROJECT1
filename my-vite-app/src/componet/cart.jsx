import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import EmptyCart from './EmptyCart';
import styles from '../Cart.module.css';
import Navbar from "./navBar"
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view your cart');
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/cart/get', {
        headers: { authorization: `Bearer ${token}` }
      });
      console.log('Cart response:', response.data);
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error(error.response?.data?.message || 'Failed to load cart items');
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/cart/update', 
        { productId, quantity: newQuantity },
        { headers: { authorization: `Bearer ${token}` }}
      );
      fetchCartItems();
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/cart/remove', {
        headers: { authorization: `Bearer ${token}` },
        data: { productId }
      });
      fetchCartItems();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/isFavorite/add', 
        { productId },
        { headers: { authorization: `Bearer ${token}` }}
      );
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const handleCheckout = () => {
    const total = calculateTotal();
    navigate('/payment', { state: { amount: total }});
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <ShoppingBag className={styles.loadingIcon} />
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <><Navbar />
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      
      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.productId} className={styles.cartItem}>
              <div className={styles.productImage}>
                <img src={item.product.image} alt={item.product.name} />
              </div>
              
              <div className={styles.productInfo}>
                <h3>{item.product.name}</h3>
                <p className={styles.productPrice}>${item.product.price}</p>
                
                <div className={styles.quantityControls}>
                  <button 
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className={styles.itemActions}>
                <button 
                  className={styles.actionButton}
                  onClick={() => addToWishlist(item.productId)}
                >
                  <Heart size={20} />
                </button>
                <button 
                  className={styles.actionButton}
                  onClick={() => removeFromCart(item.productId)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>
          
          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <button 
            className={styles.checkoutButton}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          <div className={styles.couponSection}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button>Apply Coupon</button>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default Cart;