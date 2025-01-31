const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// ✅ Image upload route
router.post("/upload-image",  productController.handleImageUpload);

// ✅ Add product route (with image upload)
router.post("/add", productController.addProduct);

// // ✅ Delete product route
// router.delete("/delete-product/:id", productController.deleteProduct);
// // ✅ get product route
router.get("/getAll", productController.AllProduct);

module.exports = router;
