const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
} = require("../../controller/staff/teachersController");
const { advancedResult } = require("../../middlewares/advancedResult");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const { teacherModel } = require("../../model/Staff/teacherModel");

const teacherRouter = require("express").Router();

teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.get(
  "/admin",
  isLogin,
  isAdmin,
  advancedResult(teacherModel, { path: "examsCreated", populate: { path: "questions" } }),
  getAllTeachersAdmin
);
teacherRouter.put("/:teacherID/admin", isLogin, isAdmin, adminUpdateTeacher);
teacherRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);

teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
teacherRouter.put("/update", isTeacherLogin, isTeacher, teacherUpdateProfile);

module.exports = {
  teacherRouter,
};
