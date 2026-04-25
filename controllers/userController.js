const users = require("../models/userModel");
const bcrypt = require("bcrypt");

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
