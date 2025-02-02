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
router.get('/getByCategoryId/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        console.log('Fetching products for category ID:', categoryId);

        const products = await product.findAll({
            where: {
                categoryId: parseInt(categoryId)
            }
        });

        console.log('Found products:', products);

        res.status(200).json({
            success: true,
            data: products || []
        });

    } catch (error) {
        console.error('Error in getByCategoryId:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products by category',
            error: error.message
        });
    }
});

module.exports = router;
