const express = require("express");
const Router = express.Router();
<<<<<<< HEAD
const { deleted, login, register } = require("../controllers/user.controller")
=======
const{deleted,login,register,getUserIdFromToken}=require("../controllers/user.controller")
const refreshTokenMiddleware =require("../middlewares/auth")

Router.delete("/:id",deleted);
Router.post("/login",login);
Router.post("/register",register);
Router.get("/getcurrentuser",refreshTokenMiddleware,getUserIdFromToken);

>>>>>>> 0b9ac64c06da9b7e49ac65cb4cc1811de7adccbf

Router.delete("/:id", deleted);
Router.post("/login", login);
Router.post("/register", register);
module.exports = Router;