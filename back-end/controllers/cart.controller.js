const { cart, product, user } = require("../models/index");

module.exports = {
  addToCart: async (req, res) => {
    try {
      let { userId, productId, quantity } = req.body;
  
      
      // userId = parseInt(userId, 10);
  
  
      const existingUser = await user.findByPk(userId);
      if (!existingUser) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      
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
  },

  deleteFromCart: async (req, res) => {
    try {
      const { userId, productId } = req.body;

      // Check if the cart item exists
      const cartItem = await cart.findOne({ where: { userId, productId } });
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      // Delete the item from the cart
      await cartItem.destroy();

      res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      res.status(500).json({ message: "Failed to remove item from cart", error });
    }
  }
};
