const express = require("express");
const Router = express.Router();
const{deleted,login,register,getUserIdFromToken,updateUser}=require("../controllers/user.controller")
const refreshTokenMiddleware =require("../middlewares/auth")

Router.delete("/:id",deleted);
Router.post("/login",login);
Router.post("/register",register);
Router.get("/getcurrentuser",refreshTokenMiddleware,getUserIdFromToken);


Router.put("/:id",updateUser)


module.exports = Router;