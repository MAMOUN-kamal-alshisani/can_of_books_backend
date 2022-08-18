const express = require("express");
require("dotenv").config();
const server = express();
const PORT = process.env.PORT || 3004;
server.use(express.json());
const cors = require("cors");
server.use(cors());

//// get the crud functionality for the endpoints ////
const {
  getBooksFn,
  addDataFn,
  removeBookFn,
  updateDataFn,
} = require("./modules/operations");

/// base endpoint for every url! ///
server.get("/", (req, res) => {
  res.status(200).send(`<h1>Home Page!</h1>`);
});
server.get("/test", (req, res) => {
  res.status(200).send(`<h1>working well!</h1>`);
});

//// Api End Point for mongodb database data /////
server.get("/books", getBooksFn);
server.post("/books", addDataFn);
server.delete("/books/:id", removeBookFn);
server.put("/books/:id", updateDataFn);

server.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
