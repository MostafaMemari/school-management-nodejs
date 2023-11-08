const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
} = require("../../controller/staff/teachersController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const teacherRouter = require("express").Router();

teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.get("/admin", isLogin, isAdmin, getAllTeachersAdmin);
teacherRouter.put("/:teacherID/admin", isLogin, isAdmin, adminUpdateTeacher);
teacherRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);

teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
teacherRouter.put("/update", isTeacherLogin, isTeacher, teacherUpdateProfile);

module.exports = {
  teacherRouter,
};
