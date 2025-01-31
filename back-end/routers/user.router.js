const express = require("express");
const Router = express.Router();
// const{deleted,login,register}=require("../controllers/user.controller")
const {authenticateToken}=require("../midlleware/auth")
const{deleted,login,register,getUserIdFromToken}=require("../controllers/user.controller")
const refreshTokenMiddleware =require("../middlewares/auth")

Router.delete("/:id",deleted);
Router.post("/login",refreshTokenMiddleware,login);
Router.post("/register",register);
Router.get("/getcurrentuser",refreshTokenMiddleware,getUserIdFromToken);


module.exports = Router;