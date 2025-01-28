const express = require("express");
const RouterAdmin = express.Router();
const { login, register } = require("../controllers/admin.controler.js")

RouterAdmin.post("/login", login);
RouterAdmin.post("/register", register);

module.exports = RouterAdmin;