const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
app.use(express.json());
//ROUTES IMPORTED
const userRoute = require("./router/user.js");
const authRoute = require("./router/auth");
const productRoute = require("./router/product");
const cartRoute = require("./router/cart");
const orderroute = require("./router/order");
//ROUTES IN USE
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderroute);
const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("connected to the database");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
