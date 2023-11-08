const { createExam } = require("../../controller/academics/examController");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = require("express").Router();

examRouter.route("/").post(isTeacherLogin, isTeacher, createExam);

module.exports = {
  examRouter,
};
