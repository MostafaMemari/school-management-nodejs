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

//register
adminRouter.post("/register", registerAdmCtrl);

//login
adminRouter.post("/login", loginAdminCtrl);

//get all
adminRouter.get("/", getAdminsCtrl);

//single

adminRouter.get("/profile", getAdminProfileCtrl);

//update
adminRouter.put("/", updateAdminCtrl);

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
