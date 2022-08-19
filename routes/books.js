const express = require("express");
const Router = express.Router()
//// get the http crud functionality for the endpoints ////
const {
    getBooksFn,
    addDataFn,
    removeBookFn,
    updateDataFn,
  } = require("../modules/operations");
  
//// Api End Point for mongodb database data /////
  Router.get("/", getBooksFn);
  Router.post("/", addDataFn);
  Router.delete("/:id", removeBookFn);
  Router.put("/:id", updateDataFn);


  module.exports = Router