const express = require("express");
const helmet = require("helmet");

const carsRouter = require("../cars/cars-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.send("<h3>Car Dealership Database</h3>");
});

module.exports = server;
