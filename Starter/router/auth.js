const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registration
router.route("/register").post(async (req, res) => {
  try {
    if (!req.body.username)
      return res.status(500).json({ msg: "Please enter username" });
    if (!req.body.email)
      return res.status(500).json({ msg: "Please enter email" });
    if (!req.body.password)
      return res.status(500).json({ msg: "Please enter password" });
    else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      return res.status(200).json({ newUser });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
router.route("/login").post(async (req, res) => {
  const loggeduser = await User.findOne({ username: req.body.username });
  // console.log(loggeduser);
  if (!loggeduser) {
    return res.status(400).json({ msg: "cannot find user with this username" });
  }
  try {
    if (!(await bcrypt.compare(req.body.password, loggeduser.password))) {
      return res.status(401).json({ msg: "wrong password" });
    } else {
      const acessToken = jwt.sign({ loggeduser }, process.env.JWT);
      return res.status(200).json({ acessToken: acessToken });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
    console.log(err);
  }
});
module.exports = router;
