const { createQuestion, getQuestions, getQuestion } = require("../../controller/academics/questionsController");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const questionRouter = require("express").Router();

questionRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion);
questionRouter.get("/", isTeacherLogin, isTeacher, getQuestions);
questionRouter.get("/:id", isTeacherLogin, isTeacher, getQuestion);

module.exports = { questionRouter };
