const express = require("express");
const Router = express.Router();
const{deleted,login,register,updateUser}=require("../controllers/user.controller")

Router.delete("/:id",deleted);
Router.post("/login",login);
Router.post("/register",register);

Router.put("/:id",updateUser)


module.exports = Router;