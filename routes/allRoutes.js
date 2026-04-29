const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// to setup routes outside express server, create an object for the Router class of express
const router = new express.Router();

// register
router.post("/register", userController.registerController);

// login
router.post("/login", userController.loginController);

// google login
router.post("/google-login", userController.googleLoginController);

// user edit
router.put("/user/:id", authMiddleware, userController.userEditController);

module.exports = router;
