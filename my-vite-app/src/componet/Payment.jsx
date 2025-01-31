import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import "./Payment.css";

const stripePromise = loadStripe("pk_test_51QnFpLKbF047pIERqqM4AE8tkMoemAYpXJfPAsp45AEo3zEi9tmC7P6QzVDlX7VLWztNbm9UoHkwgv9akW3UNWE700b4qdbZR9");

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true
    if (paymentMethod === "card") {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false); // Set loading to false
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: error.message,
        });
      } else {
        const { id } = paymentMethod;
        try {
          const response = await axios.post("http://localhost:5000/api/Payment/payment", {
            amount,
            id,
          });
          if (response.data.success) {
            setLoading(false); // Set loading to false
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful',
              text: 'Thank you for your purchase!',
            }).then(() => {
              navigate("/payment-success"); // Redirect to success page
            });
          } else {
            setError("Payment failed");
            setLoading(false); // Set loading to false
            Swal.fire({
              icon: 'error',
              title: 'Payment Failed',
              text: 'Payment failed. Please try again.',
            });
          }
        } catch (error) {
          setError("Payment failed");
          setLoading(false); // Set loading to false
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: 'Payment failed. Please try again.',
          });
        }
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