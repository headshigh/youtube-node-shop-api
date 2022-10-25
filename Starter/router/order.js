const {
  createorder,
  updateorder,
  getuserorder,
  deleteorder,
  getallorderlist,
  getmonthlyincome,
} = require("../controllers/order");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const express = require("express");
const router = express();
router
  .route("/")
  .post(verifyToken, createorder)
  .get(verifyTokenAndAdmin, getallorderlist);
router
  .route("/:id")
  .patch(verifyTokenAndAuthorization, updateorder)
  .delete(verifyTokenAndAuthorization, deleteorder);
router.route("/find/:userId").get(verifyTokenAndAuthorization, getuserorder);
router.route("/income").get(verifyTokenAndAdmin, getmonthlyincome);

module.exports = router;
