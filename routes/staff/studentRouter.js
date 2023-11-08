const { adminRegisterStudent, loginStudent } = require("../../controller/staff/studentsController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");

const studentRouter = require("express").Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", isLogin, isAdmin, loginStudent);

module.exports = { studentRouter };
