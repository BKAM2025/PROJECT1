const { cart, product } = require("../models/index");

module.exports = {
  getCart: async (req, res) => {
    try {
      console.log('Getting cart for user:', req.user); // Debug log

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const userId = req.user.id;

      const cartItems = await cart.findAll({
        where: { userId },
        include: [{
          model: product,
          attributes: ['id', 'name', 'price', 'image']
        }]
      });

      console.log('Found cart items:', cartItems); // Debug log
      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      res.status(500).json({ 
        message: "Failed to fetch cart items", 
        error: error.message 
      });
    }
  },

  addToCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      const existingProduct = await product.findByPk(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      const [cartItem, created] = await cart.findOrCreate({
        where: { userId, productId },
        defaults: { quantity: quantity || 1 }
      });

      if (!created) {
        cartItem.quantity += (quantity || 1);
        await cartItem.save();
      }

      res.status(201).json(cartItem);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      res.status(500).json({ 
        message: "Failed to add item to cart", 
        error: error.message 
      });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      const cartItem = await cart.findOne({
        where: { userId, productId }
      });

      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      res.status(200).json(cartItem);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      res.status(500).json({ 
        message: "Failed to update cart item", 
        error: error.message 
      });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      const result = await cart.destroy({
        where: { userId, productId }
      });

      if (result === 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      res.status(500).json({ 
        message: "Failed to remove item from cart", 
        error: error.message 
      });
    }
  }
};