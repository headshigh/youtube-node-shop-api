const User = require("../models/users");
const deleteuser = async (req, res) => {
  try {
    const del = await User.findOneAndDelete({ _id: req.params.id });
    if (!del) {
      return res.status(401).json({ msg: "user not found with the given id" });
    }
    res.status(200).json({ del });
  } catch (err) {
    res.status(500).json({ err });
  }
};
const updateuser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return res.status(500).json({ msg: "Cannot find user" });
    } else {
      return res.status(200).json({ updatedUser });
    }
  } catch (err) {
    console.log(err);
  }
};
const getuser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    if (!user) {
      return res.status(500).json({ msg: "not found any user with the  id" });
    }
    const { password, ...others } = user._doc;
    res.stauts(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getalluser = async (req, res) => {
  try {
    var sortString = req.query.sort && req.query.sort.split(",").join(" ");
    if (!sortString) sortString = " ";
    console.log(sortString);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let user1 = User.find({}).sort(sortString);
    user1 = user1.skip(skip).limit(limit);
    const user = await user1;
    if (!user) {
      return res.status(500).json({ msg: "not found any user with the  id" });
    } else {
      // const { password, ...others } = user._doc;
      res.status(200).json({ users: user });
    }
  } catch (err) {
    console.log(err);
  }
};
const getuserstats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { deleteuser, updateuser, getuser, getalluser, getuserstats };
