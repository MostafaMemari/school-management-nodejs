const {
  adminRegisterStudent,
  loginStudent,
  studentProfile,
  studentsAdmin,
  getStudentByAdmin,
} = require("../../controller/staff/studentsController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const studentRouter = require("express").Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.get("/admin", isLogin, isAdmin, studentsAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getStudentByAdmin);

studentRouter.post("/login", isLogin, isAdmin, loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, studentProfile);

module.exports = { studentRouter };
