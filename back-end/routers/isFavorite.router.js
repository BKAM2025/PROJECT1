const express = require("express");
const router = express.Router();
const { toggleFavorite, getFavoriteProducts } = require("../controllers/isFavorite.controller");
const refreshTokenMiddleware =require("../middlewares/auth")

router.put("/:productId/favorite",refreshTokenMiddleware, toggleFavorite);
router.get("/favorites", getFavoriteProducts);

module.exports = router;