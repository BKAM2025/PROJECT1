const stripe = require("stripe")(process.env.stripe_secret_key);
const handlePayment = async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    });

    res.json({
      success: true,
      message: "Payment successful",
      payment: {
        id: payment.id,
        status: payment.status
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Payment failed",
    });
  }
};

module.exports = { handlePayment };