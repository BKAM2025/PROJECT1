const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const multer = require('multer');

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary storage before Cloudinary

// Route to handle image upload
router.post('/upload-image', upload.single('file'), productController.handleImageUpload);

// Route to add a new product
router.post('/add', productController.addProduct);



// Export the router
module.exports = router; 