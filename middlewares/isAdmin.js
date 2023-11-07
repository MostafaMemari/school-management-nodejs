const { adminModel } = require("../model/Staff/adminModel");
const { verifyToken } = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
  // find the user
  const userId = req?.userAuth?._id;
  const amdinFound = await adminModel.findById(userId);
  // check is Admin
  if (amdinFound?.role === "admin") next();
  else next(new Error("Access Denied , admin only"));
};

module.exports = {
  isAdmin,
};
