const users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
exports.registerController = async (req, res) => {
  console.log("Inside registerController");
  console.log(req.body);
  const { username, email, password } = req.body;

  // check whether the email is in db
  const existingUser = await users.findOne({ email });
  if (existingUser) {
    res.status(409).json("User already exists... Please Login!");
  } else {
    let encryptPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({
      username,
      email,
      password: encryptPassword,
    });
    res.status(201).json(newUser);
  }
};

// login
exports.loginController = async (req, res) => {
  console.log("Inside loginController");
  const { email, password } = req.body;

  // check whether the email is in db
  const existingUser = await users.findOne({ email });

  if (existingUser) {
    // if present, check password
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (isPasswordMatch) {
      const token = jwt.sign(
        { userMail: email, role: existingUser.role },
        process.env.JWTSECRET,
      );

      res.status(200).json({
        user: existingUser,
        token,
      });
    } else {
      res.status(409).json("Invalid Email / Password!!");
    }
  } else {
    // if not present
    res
      .status(409)
      .json("Invalid Email... Please Register to access the Bookstore!!");
  }
};

// google login
exports.googleLoginController = async (req, res) => {
  console.log("Inside googleLoginController");
  const { email, password, username, picture } = req.body;

  // check whether the email is in db
  const existingUser = await users.findOne({ email });

  if (existingUser) {
    // if present, check password
    const token = jwt.sign(
      { userMail: existingUser.email, role: existingUser.role },
      process.env.JWTSECRET,
    );

    res.status(200).json({ user: existingUser, token });
  } else {
    // if not present, register user
    let encryptPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({
      username,
      email,
      password: encryptPassword,
      picture,
    });

    const token = jwt.sign(
      { userMail: newUser.email, role: newUser.role },
      process.env.JWTSECRET,
    );

    res.status(200).json({ user: newUser, token });
  }
};

// user edit
exports.userEditController = async (req, res) => {
  console.log("Inside userEditController");

  console.log(req.body);
  res.status(200).json("Recieved userEdit request");
};
