const express = require("express");
const RouterUser = express.Router();
const {getAllProducts ,createProduct,deleted} = require("../controllers/product.controller")

RouterUser.get("/get", getAllProducts);
RouterUser.post("/post", createProduct);
RouterUser.post("/:id", deleted)

module.exports = RouterUser; 