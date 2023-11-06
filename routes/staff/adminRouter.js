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
const { isAdmin } = require("../../middlewares/isAdmin");

const { isLogin } = require("../../middlewares/isLogin");

//register
adminRouter.post("/register", registerAdmCtrl);

//login
adminRouter.post("/login", loginAdminCtrl);

//get all
adminRouter.get("/", isLogin, getAdminsCtrl);
//single

adminRouter.get("/profile", isLogin, isAdmin, getAdminProfileCtrl);

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
