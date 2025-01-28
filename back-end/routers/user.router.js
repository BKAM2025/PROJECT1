const express = require("express");
const Router = express.Router();
const{deleted,login,register}=require("../controllers/user.controller")

Router.delete("/:id",deleted);
Router.post("/login",login);
Router.post("/register",register);

module.exports = Router;