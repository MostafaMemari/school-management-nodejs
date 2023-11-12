const { verifyToken } = require("../utils/verifyToken");

const isAuth = (model) => {
  return async (req, res, next) => {
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];

    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
      const admin = await model.findById(verifiedToken.id).select("name email role");
      req.userAuth = admin;
      next();
    } else {
      const error = new Error("Token expired/invalid");
      next(error);
    }
  };
};

module.exports = {
  isAuth,
};
