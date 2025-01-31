const express = require("express");
const RouterAdmin = express.Router();
const { login, register, getALLusers, getSellers, getBuyer, ProductOfOne } = require("../controllers/admin.controller")

RouterAdmin.post("/login", login);
RouterAdmin.post("/register", register);
RouterAdmin.get("/all", getALLusers)
RouterAdmin.get("/allSeller", getSellers)
RouterAdmin.get("/allBuyer", getBuyer)
RouterAdmin.get("/product/:id", ProductOfOne)
module.exports = RouterAdmin; 