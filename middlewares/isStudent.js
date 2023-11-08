const { studentModel } = require("../model/Staff/studentModel");

const isStudent = async (req, res, next) => {
  //find the user
  const userId = req?.userAuth?._id;
  const studentFound = await studentModel.findById(userId).select("name email role");
  //check if admin
  if (studentFound?.role === "student") {
    next();
  } else {
    next(new Error("Access Denied, Student only"));
  }
};

module.exports = isStudent;
