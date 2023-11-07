const { adminRegisterTeacher, loginTeacher, getAllTeachersAdmin, getTeacherByAdmin } = require("../../controller/staff/teachersController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");

const teacherRouter = require("express").Router();

teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/admin", isLogin, isAdmin, getAllTeachersAdmin);
teacherRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);

module.exports = {
  teacherRouter,
};
