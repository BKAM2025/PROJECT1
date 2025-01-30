import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartList() {
  // const [cartItems, setCartItems] = useState([]);
  // console.log(cartItems, "cartItems") ;
  

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  // const fetchCartItems = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/cart/get');
  //     setCartItems(response.data);
  //   } catch (error) {
  //     console.error('Failed to fetch cart items:', error);
  //   }
  // };

  // const addToCart = async (product) => {
  //   try {
  //     await axios.post('http://localhost:5000/api/cart/add', {
  //       userId: '1', // Replace with actual user ID
  //       productId: product.productId,
  //       quantity: product.quantity
  //     });
  //     fetchCartItems(); // Refresh the cart list
  //   } catch (error) {
  //     console.error('Failed to add item to cart:', error);
  //   }
  // };

  return (
    <div>
      <h2>Cart</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {cartItems.map((item) => (
          <div key={item.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            width: '200px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
          </div>
        ))}
      </div>
      {/* <button
        onClick={() =>
          addToCart({
            productId: '1',
            quantity: 1
          })
        }
      >
        Add Product 1 to Cart
      </button> */}
    </div>
  );
}

export default CartList;