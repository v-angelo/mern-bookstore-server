const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  console.log("Inside admin authentication middleware");

  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);

  if (token) {
    try {
      const jwtResponse = jwt.verify(token, process.env.JWTSECRET);
      console.log(jwtResponse);

      req.payload = jwtResponse.userMail;
      const role = jwtResponse.role;

      if (role == "admin") {
        next();
      } else {
        res.status(401).json("Authorization failed... Unauthorized User!!");
      }
    } catch (err) {
      res.status(401).json("Invalid token! Please Login!!");
    }
  } else {
    res.status(401).json("Authorization failed... Token missing!!");
  }
};

module.exports = adminMiddleware;
