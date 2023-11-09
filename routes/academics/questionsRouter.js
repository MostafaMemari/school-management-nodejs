const { createQuestion } = require("../../controller/academics/questionsController");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const questionRouter = require("express").Router();

questionRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion);

module.exports = { questionRouter };
