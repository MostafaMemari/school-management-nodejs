const { adminRegisterTeacher, loginTeacher } = require("../../controller/staff/teachersController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");

const teacherRouter = require("express").Router();

teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.post("/login", loginTeacher);

module.exports = {
  teacherRouter,
};
