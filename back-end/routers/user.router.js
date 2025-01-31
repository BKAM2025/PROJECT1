const express = require("express");
const Router = express.Router();
const { deleted, login, register, getUserIdFromToken } = require("../controllers/user.controller")
const { refreshTokenMiddleware } = require("../controllers/user.controller")

Router.delete("/:id", deleted);
Router.post("/login", refreshTokenMiddleware, login);
Router.post("/register", refreshTokenMiddleware, register);
// Router.get("/getcurrentuser", refreshTokenMiddleware, getUserIdFromToken);


Router.delete("/:id", deleted);
Router.post("/login", login);
Router.post("/register", register);
module.exports = Router;