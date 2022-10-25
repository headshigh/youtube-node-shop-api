const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const {
  createproduct,
  updateproduct,
  deleteproduct,
  getsingleproduct,
  getallproduct,
  getproduct,
} = require("../controllers/productcontroller");

const express = require("express");
const router = express.Router();
//routes

router.route("/").post(verifyTokenAndAdmin, createproduct).get(getallproduct);
router
  .route("/:id")
  .patch(verifyTokenAndAdmin, updateproduct)
  .delete(verifyTokenAndAdmin, deleteproduct);
router.route("/find/:id").get(getsingleproduct);
module.exports = router;
