import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart/get');
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/update/${itemId}`, {
        quantity: newQuantity
      });
      fetchCartItems();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const applyCoupon = () => {
    // Implement coupon logic here
    console.log('Applying coupon:', couponCode);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="cart-header" style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <span onClick={()=>{navigate("/home")}}  >Home</span>
        <span>/</span>
        <span>Cart</span>
      </div>

      <div className="cart-content">
        {/* Cart Headers */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr 1fr 1fr', 
          gap: '20px',
          padding: '10px 0',
          borderBottom: '1px solid #eee'
        }}>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div key={item.id} style={{ 
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '20px',
            padding: '20px 0',
            borderBottom: '1px solid #eee',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <img 
                src={item.product.image} 
                alt={item.product.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <span>{item.product.name}</span>
            </div>
            <div>${item.product.price}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                display: 'flex',
                border: '1px solid #ddd',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  style={{ padding: '5px 10px', border: 'none', background: '#f5f5f5' }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                  style={{ 
                    width: '50px', 
                    textAlign: 'center',
                    border: 'none',
                    borderLeft: '1px solid #ddd',
                    borderRight: '1px solid #ddd'
                  }}
                />
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ padding: '5px 10px', border: 'none', background: '#f5f5f5' }}
                >
                  +
                </button>
              </div>
            </div>
            <div>${(item.product.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}

        {/* Coupon and Cart Total */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: '30px',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              style={{ 
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <button
              onClick={applyCoupon}
              style={{
                padding: '10px 20px',
                backgroundColor: '#E32D2D',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Apply Coupon
            </button>
          </div>

          <div style={{ 
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '20px'
          }}>
            <h3 style={{ marginBottom: '15px' }}>Cart Total</h3>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                borderTop: '1px solid #ddd',
                paddingTop: '10px',
                marginTop: '10px'
              }}>
                <span>Total:</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <button
                style={{
                  padding: '12px',
                  backgroundColor: '#E32D2D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Process to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartList;