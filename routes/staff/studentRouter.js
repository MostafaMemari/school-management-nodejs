const { adminRegisterStudent, loginStudent, studentProfile } = require("../../controller/staff/studentsController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const studentRouter = require("express").Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", isLogin, isAdmin, loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, studentProfile);

module.exports = { studentRouter };
