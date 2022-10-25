const express = require("express");
const router = express();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("../models/users");
const {
  deleteuser,
  updateuser,
  getuser,
  getuserstats,
  getalluser,
} = require("../controllers/usercontroller");
const bcrypt = require("bcrypt");
router
  .route("/:id")
  .patch(verifyTokenAndAuthorization, updateuser)
  .delete(verifyTokenAndAuthorization, deleteuser)
  .get(verifyTokenAndAuthorization, getuser);
router.route("/").get(verifyTokenAndAuthorization, getalluser);
router.route("/stats").get(verifyTokenAndAdmin, getuserstats);
module.exports = router;
