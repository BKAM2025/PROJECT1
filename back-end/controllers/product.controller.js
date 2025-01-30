const { product } = require("../models/index")
const multer = require("multer");
const path = require("path");

// ✅ Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store images
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename); // Save file with a unique name
  },
});

// ✅ File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false);
  }
};

// ✅ Initialize multer middleware✅
const upload = multer({ storage, fileFilter });

// ✅ Middleware for handling image uploads✅
const uploadImage = upload.single("file");

// ✅ Handle image upload response✅
const handleImageUpload = (req, res) => {
  if (req.file) {
    const imageUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
  } else {
    return res.status(400).json({ message: "No image uploaded" });
  }
};

// ✅ Add Product Function
const addProduct = async (req, res) => {
  try {
    const { name, price, description, stock, userId, categoryId } = req.body;

    // Ensure the image URL is properly handled
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Create product entry in database
    const newProduct = await product.create({
      name,
      price: parseFloat(price), // Ensure price is stored as a float
      description,
      stock: parseInt(stock), // Ensure stock is stored as an integer
      image,
      userId,
      categoryId
    });

    return res.status(201).send({ message: "Product added successfully", newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Error adding product", error });
  }
};

// ✅ Delete Product Function
const deleteProduct = async (req, res) => {
  try {
    const deleted = await product.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Error deleting product", error });
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

// ✅ Export all controller functions
module.exports = {
  uploadImage,
  handleImageUpload,
  addProduct,
  deleteProduct,
  AllProduct
};
