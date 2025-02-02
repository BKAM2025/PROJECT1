import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import styles from '../EmptyCart.module.css';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.emptyCartContainer}>
      <div className={styles.emptyCartContent}>
        <ShoppingBag size={64} className={styles.icon} />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button 
          className={styles.shopButton}
          onClick={() => navigate('/home')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;