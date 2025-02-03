const express = require("express");
const RouterAdmin = express.Router();
const refreshTokenMiddleware = require("../middlewares/auth")
const { login, register, getALLusers, getSellers, getBuyer, gettAllcategory, addCategoryAdmin, ProductOfOne, deleteProductAdmin, createCategorie, deleteCategoryAdmin, deleteUserAdmin, UpdateCategory, UpdateUser, getOneAdmin, UpdateAdmine } = require("../controllers/admin.controller")

RouterAdmin.post("/login", login);
RouterAdmin.post("/register", register);
RouterAdmin.get("/all", getALLusers)
RouterAdmin.get("/allSeller", getSellers)
RouterAdmin.get("/allBuyer", getBuyer)
RouterAdmin.get("/products/:id", ProductOfOne)
RouterAdmin.get("/allcategory", gettAllcategory)
RouterAdmin.post("/addCat", addCategoryAdmin)
RouterAdmin.delete("/product/:id", deleteProductAdmin)
RouterAdmin.post("/add/categorie", createCategorie)
RouterAdmin.delete("/category/:id", deleteCategoryAdmin)
RouterAdmin.delete("/user/:id", deleteUserAdmin)
RouterAdmin.put("/updateCat/:id", UpdateCategory)
RouterAdmin.put("/userUp/:id", UpdateUser)
RouterAdmin.get("/:id", getOneAdmin)
RouterAdmin.put("/:id", UpdateAdmine)
module.exports = RouterAdmin; 