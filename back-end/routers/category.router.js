const express = require("express");
const RouterCategory = express.Router();
const auth = require("../middlewares/auth");
const { 
  add,
  getAll,
  getProductByCategoryName,
  getProductByCategoryId,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

// Public routes (no auth required)
RouterCategory.get("/getAll", getAll);
RouterCategory.get("/products/name/:name", getProductByCategoryName);
RouterCategory.get("/products/id/:id", getProductByCategoryId);

// Protected routes (auth required)
// Apply auth middleware to routes below
RouterCategory.post("/add", add);
RouterCategory.put("/update/:id", updateCategory);
RouterCategory.delete("/delete/:id", deleteCategory);

module.exports = RouterCategory;