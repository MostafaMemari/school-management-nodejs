const { studentModel } = require("../model/Staff/studentModel");
const { verifyToken } = require("../utils/verifyToken");

const isStudentLogin = async (req, res, next) => {
  //get token from header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  console.log(token);

  // verify token
  const verifiedToken = verifyToken(token);

  if (verifiedToken) {
    //find the admin
    const student = await studentModel.findById(verifiedToken.id).select("name email role");
    //save the user into req.obj
    req.userAuth = student;
    next();
  } else {
    const err = new Error("Token expired/invalid");
    next(err);
  }
};

module.exports = isStudentLogin;
