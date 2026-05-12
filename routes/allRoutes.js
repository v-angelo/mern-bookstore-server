const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");
const bookController = require("../controllers/bookController");
const adminMiddleware = require("../middlewares/adminMiddleware");

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

// get book details
router.get("/book-details/:bookID", bookController.getSingleBookController);

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

// remove user upload books
router.delete(
  "/books/:id",
  authMiddleware,
  bookController.removeUserUploadBookController,
);

// book payment
router.put(
  "/books/:id/buy",
  authMiddleware,
  bookController.bookPaymentController,
);

// get book details using ai
router.post(
  "/books-ai",
  authMiddleware,
  bookController.generateBookDetailsAIController,
);

// ----------------------AUTHORISED USER: ADMIN-------------------

// admin profile edit
router.put(
  "/profile/:id",
  adminMiddleware,
  multerMiddleware.single("picture"),
  userController.userEditController,
);

// all users list
router.get("/user-list", adminMiddleware, userController.getAllUsersController);

// all books list
router.get("/book-list", adminMiddleware, bookController.getAllBookController);

// update books status
router.put(
  "/books/:id",
  adminMiddleware,
  bookController.updateBookStatusController,
);

module.exports = router;
