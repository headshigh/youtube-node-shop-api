const product = require("../models/order");
const createorder = async (req, res) => {
  try {
    const newproduct = await product.create(req.body);
    if (!newproduct) {
      return res.status(500).json({ msg: "unable to create new product" });
    } else {
      res.status(200).json({ product: newproduct });
    }
  } catch (err) {
    console.log(err);
  }
};
const updateorder = async (req, res) => {
  try {
    const updated = await product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(500).json({ msg: "unable to update the product" });
    } else {
      res.status(200).json({ updated: updated });
    }
  } catch (err) {
    console.log(err);
  }
};
const getuserorder = async (req, res) => {
  try {
    const received = await product.findOne({ userId: req.params.id });
    if (!received) {
      return res
        .status(500)
        .json({ msg: "not found any product with the  id" });
    }

    res.stauts(200).json(received);
  } catch (err) {
    console.log(err);
  }
};
const getallorderlist = async (req, res) => {
  try {
    var sortString = req.query.sort && req.query.sort.split(",").join(" ");
    if (!sortString) sortString = " ";
    // console.log(sortString);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let product1 = product.find({}).sort(sortString);
    product1 = product1.skip(skip).limit(limit);
    const products = await product1;
    if (!products) {
      return res.status(500).json({ msg: "unable to find products" });
    } else {
      // const { password, ...others } = products._doc;
      res.status(200).json({ products: products });
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteorder = async (req, res) => {
  try {
    const del = await product.findOneAndDelete({ _id: req.params.id });
    if (!del) {
      return res
        .status(401)
        .json({ msg: "product not found with the given id" });
    }
    res.status(200).json({ del });
  } catch (err) {
    console.log(err);
  }
};
// const getsingleincart = async (req, res) => {
//   try {
//     const single = await product.find({ _id: req.params.id });
//     if (!single) {
//       return res.status(500).json({ msg: "not found any user with the  id" });
//     }
//     res.stauts(200).json(single);
//   } catch (err) {
//     console.log(err);
//   }
// };
const getmonthlyincome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createorder,
  updateorder,
  getuserorder,
  deleteorder,
  getallorderlist,
  getmonthlyincome,
};
