const express = require("express");
const Router = express.Router();
const{deleted,login,register}=require("../controllers/user.controller")
const {authenticateToken}=require("../midlleware/auth")
Router.delete("/:id",deleted);
Router.post("/login",authenticateToken,login);
Router.post("/register",register);

module.exports = Router;