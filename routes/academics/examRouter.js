const { createExam, getExams, getExam, updateExam } = require("../../controller/academics/examController");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = require("express").Router();

examRouter.route("/").post(isTeacherLogin, isTeacher, createExam).get(isTeacherLogin, isTeacher, getExams);

examRouter.route("/:id").get(isTeacherLogin, isTeacher, getExam).put(isTeacherLogin, isTeacher, updateExam);

module.exports = {
  examRouter,
};
