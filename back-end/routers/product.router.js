const express = require("express");
const RouterProduct = express.Router();
const { getAllUser,getAllProduct,addProduct,updateProduct,deleted } = require("../controllers/product.controller")

RouterProduct.get("/:userId", getAllUser);
RouterProduct.get("/", getAllProduct);
RouterProduct.post("/", addProduct);
RouterProduct.put("/:id", updateProduct);
RouterProduct.delete("/:id", deleted);






module.exports = RouterProduct; 