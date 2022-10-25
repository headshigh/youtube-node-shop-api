const {
  createcart,
  updatecart,
  getusercart,
  deletecart,
  getallcarts,
} = require("../controllers/cart");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const express = require("express");
const router = express();
router
  .route("/")
  .post(verifyToken, createcart)
  .get(verifyTokenAndAdmin, getallcarts);
router
  .route("/:id")
  .patch(verifyTokenAndAuthorization, updatecart)
  .delete(verifyTokenAndAuthorization, deletecart);
router.route("/find/:userId").get(verifyTokenAndAuthorization, getusercart);

module.exports = router;
