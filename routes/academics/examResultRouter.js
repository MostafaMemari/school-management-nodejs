const { checkExamResults, getAllExamResults } = require("../../controller/academics/examResultsController");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const examResultRouter = require("express").Router();

examResultRouter.get("/", getAllExamResults);
examResultRouter.get("/:id/cheking", isStudentLogin, isStudent, checkExamResults);

module.exports = {
  examResultRouter,
};
