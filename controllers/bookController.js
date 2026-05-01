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

// get all user uploaded books: diplay all books ignoring current user

// get user profile books: diplay books uploaded by current user

// get user bought books: display books bought by current user

// remove book by a user

// get a single book to view

// get all books: at admin resource page

// update book status: at admin page

// book payment
