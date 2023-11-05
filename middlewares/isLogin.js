const { adminModel } = require("../model/Staff/adminModel");
const { verifyToken } = require("../utils/verifyToken");

const isLogin = async (req, res, next) => {
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  const verifiedToken = verifyToken(token);

  if (verifiedToken) {
    const admin = await adminModel.findById(verifiedToken.id).select("name email role");
    req.userAuth = admin;
    next();
  } else {
    const error = new Error("Token expired/invalid");
    next(error);
  }
};

module.exports = {
  isLogin,
};
