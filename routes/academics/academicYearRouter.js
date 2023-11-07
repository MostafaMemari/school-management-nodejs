const {
  createAcademicYear,
  getAcademicYear,
  getAcademicYears,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controller/academics/academicYearController");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isLogin } = require("../../middlewares/isLogin");

const academicYearRouter = require("express").Router();

academicYearRouter.route("/").post(isLogin, isAdmin, createAcademicYear).get(isLogin, isAdmin, getAcademicYears);

academicYearRouter
  .route("/:id")
  .get(isLogin, isAdmin, getAcademicYear)
  .put(isLogin, isAdmin, updateAcademicYear)
  .delete(isLogin, isAdmin, deleteAcademicYear);

module.exports = { academicYearRouter };
