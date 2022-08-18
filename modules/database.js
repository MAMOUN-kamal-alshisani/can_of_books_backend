//// mongo database functionality ////

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
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

  module.exports = UserModel