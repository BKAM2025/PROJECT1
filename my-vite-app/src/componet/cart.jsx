import React, { useState } from 'react';
import styles from '../Cart.module.css';
import { Trash2, Heart } from 'lucide-react'; // Assuming you're using lucide-react for icons

const Cart = ({handleCheckout}) => {
  const [quantities, setQuantities] = useState({
    'LCD Monitor': 1,
    'Game Controller': 2
  });

  const prices = {
    'LCD Monitor': 650,
    'Game Controller': 550
  };

  const updateQuantity = (product, value) => {
    setQuantities(prev => ({
      ...prev,
      [product]: Math.max(0, value)
    }));
  };

  const subtotal = Object.entries(quantities).reduce(
    (sum, [product, quantity]) => sum + prices[product] * quantity,
    0
  );

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart__title}>Shopping Cart</h1>
      
      <div className={styles.cart__content}>
        <div className={styles.cart__itemsSection}>
          <div className={styles.cart__header}>
            <div className={styles.cart__headerProduct}>Product</div>
            <div className={styles.cart__headerPrice}>Price</div>
            <div className={styles.cart__headerQuantity}>Quantity</div>
            <div className={styles.cart__headerSubtotal}>Subtotal</div>
            <div className={styles.cart__headerActions}>Actions</div>
          </div>

          <div className={styles.cart__items}>
            {Object.entries(quantities).map(([product, quantity]) => (
              <div key={product} className={styles.cart__item}>
                <div className={styles.cart__product}>
                  <img src={`/${product.toLowerCase().replace(' ', '-')}.jpg`} alt={product} />
                  <div className={styles.cart__productInfo}>
                    <h3>{product}</h3>
                    <p>Color: Black</p>
                    <p>Size: Medium</p>
                  </div>
                </div>
                
                <div className={styles.cart__price}>
                  ${prices[product].toLocaleString()}
                </div>

                <div className={styles.cart__quantity}>
                  <button 
                    onClick={() => updateQuantity(product, quantity - 1)}
                    className={styles.cart__quantityBtn}
                  >
                    -
                  </button>
                  <span className={styles.cart__quantityNum}>{quantity}</span>
                  <button 
                    onClick={() => updateQuantity(product, quantity + 1)}
                    className={styles.cart__quantityBtn}
                  >
                    +
                  </button>
                </div>

                <div className={styles.cart__subtotal}>
                  ${(prices[product] * quantity).toLocaleString()}
                </div>

                <div className={styles.cart__itemActions}>
                  <button className={styles.cart__actionBtn}>
                    <Heart size={20} />
                  </button>
                  <button className={styles.cart__actionBtn}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cart__buttons}>
            <button className={styles.cart__returnBtn}>
              Return to Shop
            </button>
            <button className={styles.cart__updateBtn}>
              Update Cart
            </button>
          </div>
        </div>

        <div className={styles.cart__checkout}>
          <h2>Cart Total</h2>
          
          <div className={styles.cart__summary}>
            <div className={styles.cart__summaryRow}>
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className={styles.cart__summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className={styles.cart__summaryTotal}>
              <span>Total:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
          </div>

          <button className={styles.cart__checkoutBtn} onClick={()=>handleCheckout(amount)}>
            Proceed to Checkout
          </button>

          <div className={styles.cart__coupon}>
            <input 
              type="text" 
              placeholder="Coupon Code"
              className={styles.cart__couponInput}
            />
            <button className={styles.cart__couponBtn}>
              Apply Coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;