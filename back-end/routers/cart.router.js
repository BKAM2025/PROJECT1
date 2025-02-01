const express = require("express");
const RouterCart = express.Router();
const auth = require("../middlewares/auth");
const { 
  addToCart, 
  getCart, 
  updateCartItem, 
  removeFromCart 
} = require("../controllers/cart.controller");

// Apply auth middleware to all cart routes
RouterCart.use(auth);

RouterCart.post("/add", addToCart);
RouterCart.get("/get", getCart); // Remove userId param as it's now from auth
RouterCart.put("/update", updateCartItem);
RouterCart.delete("/remove", removeFromCart);

module.exports = RouterCart;