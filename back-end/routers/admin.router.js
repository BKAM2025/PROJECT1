const express = require("express");
const RouterAdmin = express.Router();
const { login, register, getALLusers, getSellers, getBuyer, ProductOfOne, gettAllcategory, addCategoryAdmin } = require("../controllers/admin.controller")

RouterAdmin.post("/login", login);
RouterAdmin.post("/register", register);
RouterAdmin.get("/all", getALLusers)
RouterAdmin.get("/allSeller", getSellers)
RouterAdmin.get("/allBuyer", getBuyer)
RouterAdmin.get("/product/:id", ProductOfOne)
RouterAdmin.get("/allcategory", gettAllcategory)
RouterAdmin.post("/addCat", addCategoryAdmin)
module.exports = RouterAdmin; 