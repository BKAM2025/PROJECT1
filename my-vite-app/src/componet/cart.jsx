// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function CartList() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/cart/get');
//       setCartItems(response.data);
//     } catch (error) {
//       console.error('Failed to fetch cart items:', error);
//     }
//   };

//   const addToCart = async (product) => {
//     try {
//       await axios.post('http://localhost:5000/api/cart/add', product);
//       fetchCartItems(); // Refresh the cart list
//     } catch (error) {
//       console.error('Failed to add item to cart:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Cart</h2>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id}>
//             {item.productName} - {item.quantity} x ${item.price}
//           </li>
//         ))}
//       </ul>
//       <button
//         onClick={() =>
//           addToCart({
//             productId: '1',
//             productName: 'Product 1',
//             quantity: 1,
//             price: 10,
//           })
//         }
//       >
//         Add Product 1 to Cart
//       </button>
//     </div>
//   );
// }

// export default CartList;