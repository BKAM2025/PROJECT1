const { product } = require("../models/index");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dsbt68v5j",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle image upload to Cloudinary
const handleImageUpload = async (req, res) => {
  try {
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file, {
      folder: "products",
    });
    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return res.status(500).json({ message: "Error uploading image", error });
  }
};

// Add Product Function
const addProduct = async (req, res) => {
  try {
    if(!req.user.role === "user"){
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, price, description, stock, categoryId, image } = req.body;

    // Create product entry in database
    const newProduct = await product.create({
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock),
      image,
      userId: req.user.id,
      categoryId,
    });

    return res.status(200).send({ message: "Product added successfully", newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Error adding product", error });
  }
};
const AllProduct = async (req, res) => {
  try {
    const data = await product.findAll();

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).send(data);
  } catch (error) {
    console.error("Error get product:", error);
    return res.status(500).json({ message: "Error get product", error });
  }
};
  const getOneProduct = async (req, res) => {
    try {
      const { id } = req.params; // Get product ID from the URL parameters
  
      // Find the product by ID
      const singleProduct = await product.findOne({
        where: { id: id }, // Assuming you're using Sequelize or similar ORM
      });
  
      if (!singleProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      return res.status(200).json(singleProduct); // Send the product data
    } catch (error) {
      console.error("Error getting product:", error);
      return res.status(500).json({ message: "Error getting product", error });
    }
  };

// Export all controller functions
module.exports = {
  handleImageUpload,
  addProduct,
  // deleteProduct,
  AllProduct,
  getOneProduct
};