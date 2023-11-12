const adminRouter = require("express").Router();

const {
  registerAdmCtrl,
  loginAdminCtrl,
  getAdminsCtrl,
  getAdminProfileCtrl,
  updateAdminCtrl,
  adminSuspendTeacherCtrl,
  adminUnSuspendTeacherCtrl,
  adminWithdrawTeacherCtrl,
  adminUnWithdrawTeacherCtrl,
  adminPublishResultsCtrl,
  adminUnPublishResultsCtrl,
  deleteAdminCtrl,
} = require("../../controller/staff/adminController");
const { advancedResult } = require("../../middlewares/advancedResult");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");

const { isLogin } = require("../../middlewares/isLogin");
const { adminModel } = require("../../model/Staff/adminModel");

//register
adminRouter.post("/register", registerAdmCtrl);

//login
adminRouter.post("/login", loginAdminCtrl);

//get all
adminRouter.get("/", isAuth(adminModel), advancedResult(adminModel, "academicTerms"), getAdminsCtrl);
// , { path: "examsCreated", populate: { path: "questions" } }
//single

adminRouter.get("/profile", isAuth(adminModel), isAdmin, getAdminProfileCtrl);

//update
adminRouter.put("/", isLogin, isAdmin, updateAdminCtrl);

//delete
adminRouter.delete("/:id", deleteAdminCtrl);

//suspend
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);

//unsuspend
adminRouter.put("/unsuspend/teacher/:id", adminUnSuspendTeacherCtrl);

//withdraw
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl);

//unwithdraw
adminRouter.put("/unwithdraw/teacher/:id", adminUnWithdrawTeacherCtrl);

//publish exams
adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl);

//unpublish exams results
adminRouter.put("/unpublish/exam/:id", adminUnPublishResultsCtrl);

module.exports = {
  adminRouter,
};
