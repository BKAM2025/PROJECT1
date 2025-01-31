const stripe = require("stripe")("sk_test_51QnFpLKbF047pIER0qmlmTtx0137dSFlKim8ZpjGYKQfbMlBF01GvNZPImS9EQWRZmox5qfQRhp9Prk7s8uY5FdU00FAhqbl0R");

const handlePayment = async (req, res) => {
  const { amount, id } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000/payment-success", // Replace with your actual return URL
    });
    res.json({ success: true, message: "Payment successful", paymentIntent });
  } catch (error) {
    res.json({ success: false, message: "Payment failed", error });
  }
};

module.exports = { handlePayment };