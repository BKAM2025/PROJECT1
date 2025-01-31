const express = require("express");
const RouterCart = express.Router();
const { addToCart,getCart ,deleteFromCart} = require("../controllers/cart.controller")
const {authenticateToken}=require("../midlleware/auth")

RouterCart.post("/add", addToCart);
RouterCart.get("/get", getCart);
RouterCart.delete("/:id",deleteFromCart);
RouterCart.post("/addto", authenticateToken,addToCart) 
module.exports = RouterCart;