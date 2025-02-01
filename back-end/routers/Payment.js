const express = require("express");
const RouterPayment = express.Router();
const { handlePayment } = require("../controllers/Payment.js")

RouterPayment.post("/payment", handlePayment);


module.exports = RouterPayment;