const { createQuestion, getQuestions, getQuestion, updateQuestion } = require("../../controller/academics/questionsController");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const questionRouter = require("express").Router();

questionRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion);
questionRouter.get("/", isTeacherLogin, isTeacher, getQuestions);
questionRouter.get("/:id", isTeacherLogin, isTeacher, getQuestion);
questionRouter.put("/:id", isTeacherLogin, isTeacher, updateQuestion);

module.exports = { questionRouter };
