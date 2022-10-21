const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url);
  //   console.log("connected to the database");
};
module.exports = connectDB;
