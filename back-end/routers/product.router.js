const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const refreshTokenMiddleware =require("../middlewares/auth")
// ✅ Image upload route
router.post("/upload-image",  productController.handleImageUpload);

// ✅ Add product route (with image upload)
router.post("/add",refreshTokenMiddleware, productController.addProduct);

// // ✅ Delete product route
// router.delete("/delete-product/:id", productController.deleteProduct);
// // ✅ get product route
router.get("/getAll", productController.AllProduct);
router.get("/:id",productController.getOneProduct)

module.exports = router;
