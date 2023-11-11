const { checkExamResults, getAllExamResults, adminToggleExamResult } = require("../../controller/academics/examResultsController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const examResultRouter = require("express").Router();

examResultRouter.get("/", getAllExamResults);
examResultRouter.put("/:id/amdin-toggle-publish", isLogin, isAdmin, adminToggleExamResult);
examResultRouter.get("/:id/cheking", isStudentLogin, isStudent, checkExamResults);

module.exports = {
  examResultRouter,
};
