const express = require("express");
const RouterAdmin = express.Router();
const { login, register } = require("../controllers/admin.controller")

RouterAdmin.post("/login", login);
RouterAdmin.post("/register", register);

module.exports = RouterAdmin; 