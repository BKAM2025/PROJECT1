const express = require("express");
const router = express.Router();
const { toggleFavorite, getFavoriteProducts } = require("../controllers/isFavorite.controller");
const refreshTokenMiddleware =require("../middlewares/auth")

router.put("/:productId",refreshTokenMiddleware, toggleFavorite);
router.get("/favorites",refreshTokenMiddleware, getFavoriteProducts);

module.exports = router;