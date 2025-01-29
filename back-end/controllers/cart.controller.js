const { cart, product, user } = require("../models/index");

module.exports = {
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

    
      const foundProduct = await product.findByPk(productId);
      if (!foundProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

  
      const [cartItem, created] = await cart.findOrCreate({
        where: { userId, productId },
        defaults: { quantity }
      });

    
      if (!created) {
        cartItem.quantity += quantity;
        await cartItem.save();
      }

      res.status(201).json(cartItem);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      res.status(500).json({ message: "Failed to add item to cart", error });
    }
  },
  getCart: async (req, res) => {
    try {
      const { userId } = req.params;

      const cartItems = await cart.findAll({
        where: { userId },
        include: product
      });

      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      res.status(500).json({ message: "Failed to fetch cart items", error });
    }
  }

 
};