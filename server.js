const express = require("express");
require("dotenv").config();
const server = express();
const PORT = process.env.PORT || 3004;
server.use(express.json());
const cors = require("cors");
server.use(cors());
const Router = require('./routes/books')
server.use("/books",Router)

/// base endpoint for every url! ///
server.get("/", (req, res) => {
  res.status(200).send(`<h1>Home Page!</h1>`);
});
server.get("/test", (req, res) => {
  res.status(200).send(`<h1>working well!</h1>`);
});




server.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
