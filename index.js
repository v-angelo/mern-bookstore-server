// import packages
require("./config/dnsconfig")();
require("dotenv").config(); // loads .env files into process.env by default
const express = require("express");
const cors = require("cors");
const routes = require("./routes/allRoutes");
require("./config/db");

// create server using express package
const server = express();

// enable cors in server
server.use(cors());

// parse json to js content
server.use(express.json());

// use routes in server
server.use(routes);

// handling static files or folders in the internet
server.use("/uploads", express.static("./uploads"));

// setup a port number to run server on the internet
const PORT = process.env.PORT;

// start server to listen to client request i.e, make the server available on the internet
server.listen(PORT, () => {
  console.log("Server started!");
});

// handling global errors in server using application specific middleware
server.use((err, req, res, next) => {
  res.status(500).json(err.message);
});

// resolve API (get request to http://localhost:3000) using express
server.get("/", (req, res) => {
  res
    .status(200)
    .send(`<h1>Server started and waiting for client request!!</h1>`);
});
