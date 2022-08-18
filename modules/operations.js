/////  Api data operations functionallity /////
const UserModel = require("./database");

function getBooksFn(req, res) {
  let EmailQuery = req.query.EmailQuery;

  /// search the model for data by the email
  UserModel.find({ email: EmailQuery }, (error, UserData) => {
    if (error) {
      res.status(401).send(console.error(error));
    } else {
      res.status(200).json(UserData);
      console.log(UserData[0].book);
    }
  });
}
/// create a new data model and send it to data api
function addDataFn(req, res) {
  let { description, img, status, title } = req.body;
  let EmailQuery = req.query.EmailQuery;

  UserModel.find({ email: EmailQuery }, (err, UserData) => {
    if (err) {
      res.status(404).send(console.log(err));
    } else {
      // let newModel = new UserModel(req.body)
      UserData[0].book.push({
        description: description,
        img: img,
        status: status,
        title: title,
      });
      console.log(UserData[0].book);
      UserData[0].save();
      res.status(201).send(UserData[0].book);
    }
  });
}
/// delete data from the selected schema using id as the needed index ////
//// http://localhost:3005/books/0?EmailQuery=mamoun.alshishani@yahoo.com ////
function removeBookFn(req, res) {
  let EmailQuery = req.query.EmailQuery;
  let favid = req.params.id;
  console.log(EmailQuery);
  console.log(favid);

  /// finding the needed schema using the email ///
  UserModel.find({ email: EmailQuery }, (err, UserData) => {
    if (err) {
      res.status(404).send(err);
    } else {
      /// an array to store the modified data after delete ///
      let newBookArray = [];
      /// atteration of data using forEach ///
      if (UserData[0].book !== undefined) {
        UserData[0].book.forEach((data, index) => {
          console.log(data);
          if (index !== Number(favid)) {
            newBookArray.push(data);
          }
        });
      }
      UserData[0].book = newBookArray;
      UserData[0].save();
      res.status(200).send(UserData[0].book);
    }
  });
}
//// update operation on already existing data in the database ////
function updateDataFn(req, res) {
  let EmailQuery = req.query.EmailQuery;
  let favId = req.params.id;

  let { description, status, img, title } = req.body;

  UserModel.find({ email: EmailQuery }, (err, UserData) => {
    if (err) {
      res.status(404).send(err);
    }
    console.log(UserData[0].book);

    UserData[0].book.splice(favId, 1, {
      description: description,
      status: status,
      img: img,
      title: title,
    });
    UserData[0].save();
    res.status(201).send(UserData[0].book);
  });
}

module.exports = { getBooksFn, addDataFn, removeBookFn, updateDataFn };
