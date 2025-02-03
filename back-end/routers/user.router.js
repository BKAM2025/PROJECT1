const express = require("express");
const Router = express.Router();
const { deleted, login, register, getUserIdFromToken } = require("../controllers/user.controller")
const { refreshTokenMiddleware } = require("../controllers/user.controller")

Router.delete("/:id", deleted);
Router.post("/login", login);
Router.post("/register", register);
// Router.get("/getcurrentuser", refreshTokenMiddleware, getUserIdFromToken);

module.exports = Router;