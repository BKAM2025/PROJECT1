import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from '../styles/Payment.module.css';
import axios from "axios";
import Swal from "sweetalert2";


const stripePromise = loadStripe("pk_test_51QnFpLKbF047pIERqqM4AE8tkMoemAYpXJfPAsp45AEo3zEi9tmC7P6QzVDlX7VLWztNbm9UoHkwgv9akW3UNWE700b4qdbZR9");

const PaymentForm = () => {
 const {state}=useLocation()
 const amount=state.amount
 console.log("amount",amount);
 
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    if (paymentMethod === "card") {
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          
        });
        

        if (error) {
          throw error;
        }

        // Convert amount to cents for Stripe
        const amountInCents = Math.round(amount * 100);
        
        const response = await axios.post("http://localhost:5000/api/Payment/payment", {
          amount: amountInCents,
          id: paymentMethod.id,
        });


        if (response.data.success) {
          setSuccess(true);
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: 'Thank you for your purchase!',
          }).then(() => {
            navigate("/payment-success");
            navigate("/home")
          });
        } else {
          throw new Error(response.data.message || "Payment failed");
        }
      } catch (error) {
        setError(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: error.message || 'Payment failed. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles['payment-container']}>
  <form className={styles['payment-form']}>
  <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Payment</h2>
        <div className="payment-methods">
          <div
            className={`payment-method ${paymentMethod === "card" ? "selected" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            Credit Card
          </div>
        </div>
        {paymentMethod === "card" && (
          <>
            <CardElement className="StripeElement" />
          </>
        )}
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Payment Successful!</div>}
      </form>
    </div>
  </form>
</div>
    
   
  );
};

const Payment = () => {
  const location = useLocation();
  const { amount } = location.state;

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} />
    </Elements>
  );
};

export default Payment;