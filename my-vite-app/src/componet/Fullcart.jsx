import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartList() {
  const [cartItems, setCartItems] = useState([]);

 

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`);
      fetchCartItems();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/update/${productId}`, {
        quantity: newQuantity
      });
      fetchCartItems();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };


//   useEffect(()=>{
//     fetchCartItems()
//   },[])



  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Cart</h2>
        <button className="move-to-bag">Move All To Bag</button>
      </div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="product-cell">
                <img src={item.image} alt={item.productName} />
                <span>{item.productName}</span>
              </td>
              <td>${item.price}</td>
              <td>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-footer">
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" />
          <button className="apply-coupon">Apply Coupon</button>
        </div>
        
        <div className="cart-total">
          <h3>Cart Total</h3>
          <div className="total-row">
            <span>Subtotal:</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total-row total">
            <span>Total:</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <button className="checkout-button">Process to checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartList;