import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
  const API_URL = import.meta.env.VITE_API_URL;
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
        
        const response = await axios.post(`${API_URL}/Payment/payment`, {
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