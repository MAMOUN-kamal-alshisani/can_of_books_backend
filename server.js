const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const server = express();
const PORT = process.env.PORT || 3004;
server.use(express.json());
const cors = require("cors");
server.use(cors());
mongoose.connect("mongodb://localhost:27017/books2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const BookSchema = new mongoose.Schema({
  title: String,
  img: String,
  description: String,
  status: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  book: [BookSchema],
});

const UserModel = mongoose.model("UserModel", UserSchema);
const BookModel = mongoose.model("bookModel", BookSchema);

/// this function is to save the model in the database with the fellowing schema ///
const UserSeed = () => {
  const user = new UserModel({
    email: "mamoun.alshishani@yahoo.com",
    book: [
      {
        title: "Quran",
        img: "https://tse4.mm.bing.net/th?id=OIP.sXa1mVlzzoeS7dq_2h4wwQHaE8&pid=Api&P=0",
        description:
          "a book like no other ,a book of allah the one and only!,The Quran, also romanized Qur`an or Koran, is the central religious text of Islam, believed by Muslims to be a revelation from God. It is organized in 114 chapters, which consist of verses . In addition to its religious significance, it is widely regarded as the finest work in Arabic literature, and has significantly influenced the Arabic language.",
        status: "ultimate",
      },
      {
        title: "The missing ones",
        img: "https://tse4.mm.bing.net/th?id=OIP.h3sV9JlBATUhRf-yA1RS0wAAAA&pid=Api&P=0",
        description:
          "The hole they dug was not deep. A white flour bag encased the little body. Three small faces watched from the window, eyes black with terror. The child in the middle spoke without turning his head. I wonder which one of us will be next?When a woman’s body is discovered in a cathedral and hours later a young man is found hanging from a tree outside his home, Detective Lottie Parker is called in to ...",
        status: "thriller",
      },
      {
        title: "Ugly love",
        img: "https://tse1.mm.bing.net/th?id=OIP.1Wic5jTHsJHiqa_-q1DZ5AHaLf&pid=Api&P=0",
        description:
          "Bearded, bad-boy barber Knox prefers to live his life the way he takes his coffee: Alone. Unless you count his basset hound, Waylon.Knox doesn`t tolerate drama, even when it comes in the form of a stranded runaway bride.",
        status: "drama",
      },
    ],
  });
  console.log(user);
  user.save();
};

UserSeed();

/// base endpoint for every url! ///
server.get("/", (req, res) => {
  res.status(200).send(`<h1>working well!</h1>`);
});

//// Api End Point for mongodb database data /////
server.get("/books", getBooksFn);
server.post("/books", addDataFn);
server.delete("/books/:id", removeBookFn);
server.put("/books/:id", updateDataFn);
/////  Api data functionallity /////
function getBooksFn(req, res) {
  let EmailQuery = req.query.EmailQuery;

  /// search the model for data by the email
  UserModel.find({ email: EmailQuery }, (error, UserData) => {
    if (error) {
      res.status(401).send(console.error(error));
    } else {
      res.json(UserData);
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
      res.send(console.log(err));
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
      res.send(UserData[0].book);
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
      res.send(err);
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
      res.send(UserData[0].book);
    }
  });
}

function updateDataFn(req, res) {
  let EmailQuery = req.query.EmailQuery;
  let favId = req.params.id;

  let {description,status,img,title} = req.body;

  UserModel.find({email:EmailQuery},(err,UserData)=>{
if(err){
  res.status(500).send(err)
}
console.log(UserData[0].book);


UserData[0].book.splice(favId,1,{
  description:description,
status:status,
img:img,
title:title,


})
UserData[0].save()
res.status(201).send(UserData[0].book)
  })
}
server.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
