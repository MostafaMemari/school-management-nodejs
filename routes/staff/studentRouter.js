const {
  adminRegisterStudent,
  loginStudent,
  studentProfile,
  studentsAdmin,
  getStudentByAdmin,
  studentUpdateProfile,
  adminUpdatestudent,
  writeExam,
} = require("../../controller/staff/studentsController");
const { advancedResult } = require("../../middlewares/advancedResult");

const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const { isLogin } = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const { adminModel } = require("../../model/Staff/adminModel");
const { studentModel } = require("../../model/Staff/studentModel");

const studentRouter = require("express").Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.get("/admin", isAuth(adminModel), isAdmin, advancedResult(studentModel), studentsAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getStudentByAdmin);
studentRouter.put("/:studentID/update/admin", isLogin, isAdmin, adminUpdatestudent);

studentRouter.post("/exam/:examID/write", isStudentLogin, isStudent, writeExam);

studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, studentProfile);
studentRouter.put("/update", isStudentLogin, isStudent, studentUpdateProfile);

module.exports = { studentRouter };
