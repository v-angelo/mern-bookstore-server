const express = require("express");
const userController = require("../controllers/userController");

// to setup routes outside express server, create an object for the Router class of express
const router = new express.Router();

// register
router.post("/register", userController.registerController);

// login
router.post("/login", userController.loginController);

module.exports = router;
