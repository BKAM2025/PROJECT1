const {product}=require("../models/index")



module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await product.findAll(); 
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { name, price, description, image, stock } = req.body;

      
      if (!name || !price || !description || !image || stock === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }
       const ValidProduct=parseFloat(price)

    
      const newProduct = await product.create({
        name,
        price:ValidProduct,
        description,
        image,
        stock,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error });
    }
  },

  deleted: (req, res) => {
    product.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.status(200).json({ message: "Product deleted" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting product", error });
      });
  },
};
