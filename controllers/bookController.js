const books = require("../models/bookModel");

// add book
exports.addBookController = async (req, res) => {
  console.log("Inside addBookController!");

  // get details from req body
  const {
    title,
    author,
    pages,
    imageURL,
    price,
    discountPrice,
    abstract,
    publisher,
    isbn,
    language,
    category,
  } = req.body;

  const uploadImages = req.files.map((item) => item.filename);
  const sellerMail = req.payload;

  console.log(
    title,
    author,
    pages,
    imageURL,
    price,
    discountPrice,
    abstract,
    publisher,
    isbn,
    language,
    category,
    uploadImages,
    sellerMail,
  );

  // check if the book is already in the database
  const existingBook = await books.findOne({ title, sellerMail });

  if (existingBook) {
    res.status(409).json("Book already exists! Operation Denied!!");
  } else {
    const newBook = await books.create({
      title,
      author,
      pages,
      imageURL,
      price,
      discountPrice,
      abstract,
      publisher,
      isbn,
      language,
      category,
      uploadImages,
      sellerMail,
    });

    res.status(201).json(newBook);
  }
};

// get latest books: get 4 latest books
exports.getHomePageBookController = async (req, res) => {
  console.log("Inside getHomePageBookController");

  const homeBooks = await books.find().sort({ _id: -1 }).limit(4);
  res.status(200).json(homeBooks);
};

// get all books apart from login user: diplay all books ignoring current user
exports.getBooksPageController = async (req, res) => {
  console.log("Inside getBooksPageController");

  const loginUserMail = req.payload;
  const allBooks = await books.find({ sellerMail: { $ne: loginUserMail } });

  res.status(200).json(allBooks);
};

// get user profile books: diplay books uploaded by current user
exports.getUserBooksController = async (req, res) => {
  console.log("Inside getUserBooksController");

  const loginUserMail = req.payload;
  const userUploadBooks = await books.find({ sellerMail: loginUserMail });

  res.status(200).json(userUploadBooks);
};

// get user bought books: display books bought by current user
exports.getUserBoughtBooksController = async (req, res) => {
  console.log("Inside getUserBooksController");

  const loginUserMail = req.payload;
  const userBoughtBooks = await books.find({ buyerMail: loginUserMail });

  res.status(200).json(userBoughtBooks);
};

// remove book by a user

// get a single book to view
exports.getSingleBookController = async (req, res) => {
  console.log("Inside getSingleBookController");

  const { bookID } = req.params;
  const bookDetails = await books.findById(bookID);

  res.status(200).json(bookDetails);
};

// get all books: at admin resource page

// update book status: at admin page

// book payment
