const { product, user} = require("../models/index");

module.exports = {
  toggleFavorite: async (req, res) => {
    try {
      const { 
     productId } = req.body;

      const [favorite, created] = await isFavorite.findOrCreate({
        where: { userId:req.user.id, productId },
        defaults: { isFavorite: true }
      });

      
      if (!created) {
        favorite.isFavorite = !favorite.isFavorite;
        await favorite.save();
      }

      res.status(200).json(favorite);
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
      res.status(500).json({ message: "Failed to toggle favorite status", error });
    }
  },

  getFavoriteProducts: async (req, res) => {
    try {
      const { userId } = req.params;

      const favoriteProducts = await product.findAll({
        include: [{
          model: user,
          as: 'FavoritedByUsers',
          where: { id: userId },
          through: { where: { isFavorite: true } }
        }]
      });

      res.status(200).json(favoriteProducts);
    } catch (error) {
      console.error("Failed to fetch favorite products:", error);
      res.status(500).json({ message: "Failed to fetch favorite products", error });
    }
  }
};