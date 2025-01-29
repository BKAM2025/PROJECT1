const express = require("express");
const RouterCart = express.Router();
const { addToCart,getCart } = require("../controllers/cart.controller")

RouterCart.post("/add", addToCart);
RouterCart.get("/get", getCart);

module.exports = RouterCart;