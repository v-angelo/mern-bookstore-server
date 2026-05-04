const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");
const bookController = require("../controllers/bookController");

// to setup routes outside express server, create an object for the Router class of express
const router = new express.Router();

// register
router.post("/register", userController.registerController);

// login
router.post("/login", userController.loginController);

// google login
router.post("/google-login", userController.googleLoginController);

// get homeBooks
router.get("/home-books", bookController.getHomePageBookController);

// ----------------------AUTHORISED USER-------------------

// user edit
router.put(
  "/user/:id",
  authMiddleware,
  multerMiddleware.single("picture"),
  userController.userEditController,
);

// add book
router.post(
  "/books",
  authMiddleware,
  multerMiddleware.array("uploadImages", 3),
  bookController.addBookController,
);

// get booksPage
router.get("/all-books", authMiddleware, bookController.getBooksPageController);

// get userUploadBooks
router.get(
  "/user-books",
  authMiddleware,
  bookController.getUserBooksController,
);

// get userBoughtBooks
router.get(
  "/bought-books",
  authMiddleware,
  bookController.getUserBoughtBooksController,
);

module.exports = router;
