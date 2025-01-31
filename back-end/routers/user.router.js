const express = require("express");
const Router = express.Router();
<<<<<<< HEAD
const{deleted,login,register}=require("../controllers/user.controller")
const {authenticateToken}=require("../midlleware/auth")
=======
const{deleted,login,register,getUserIdFromToken}=require("../controllers/user.controller")
const refreshTokenMiddleware =require("../middlewares/auth")

>>>>>>> 0b9ac64c06da9b7e49ac65cb4cc1811de7adccbf
Router.delete("/:id",deleted);
Router.post("/login",authenticateToken,login);
Router.post("/register",register);
Router.get("/getcurrentuser",refreshTokenMiddleware,getUserIdFromToken);


module.exports = Router;