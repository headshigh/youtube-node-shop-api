const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
dotenv.config();

const start = async (req, res) => {
  try {
    await connectDB(
      "mongodb+srv://headshigh:720058726Nn1@nodeexpressprojects.19wvolp.mongodb.net/new?retryWrites=true&w=majority"
    );
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
