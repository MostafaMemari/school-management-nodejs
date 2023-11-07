const { teacherModel } = require("../model/Staff/teacherModel");

const isTeacher = async (req, res, next) => {
  //find the user
  const userId = req?.userAuth?._id;
  const teacherFound = await teacherModel.findById(userId);
  //check if admin
  if (teacherFound?.role === "teacher") {
    next();
  } else {
    next(new Error("Access Denied, Teachers only"));
  }
};

module.exports = isTeacher;
