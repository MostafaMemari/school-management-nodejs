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

const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const studentRouter = require("express").Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.get("/admin", isLogin, isAdmin, studentsAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getStudentByAdmin);
studentRouter.put("/:studentID/update/admin", isLogin, isAdmin, adminUpdatestudent);

studentRouter.post("/exam/:examID/write", isStudentLogin, isStudent, writeExam);

studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, studentProfile);
studentRouter.put("/update", isStudentLogin, isStudent, studentUpdateProfile);

module.exports = { studentRouter };
