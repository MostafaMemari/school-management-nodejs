const AsyncHandler = require("express-async-handler");

const expressAsyncHandler = require("express-async-handler");
const { adminModel } = require("../../model/Staff/adminModel");
const { generateToken } = require("../../utils/generateToken");
const { verifyToken } = require("../../utils/verifyToken");

//@desc Register admin
//@route POST /api/admins/register

//@acess  Private
exports.registerAdmCtrl = AsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const amdinFound = await adminModel.findOne({ email });
  if (amdinFound) throw new Error("Admin Exists");
  const user = await adminModel.create({ name, email, password });

  res.status(201).json({
    status: "success",
    data: user,
  });
});
//@desc     login admins
//@route    POST /api/v1/admins/login
//@access   Private
exports.loginAdminCtrl = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // find user
  const user = await adminModel.findOne({ email });
  if (!user) return res.json({ message: "user not found" });
  if (user && (await user.verifyPassword(password))) {
    const token = generateToken(user._id);
    const verify = verifyToken(token);
    return res.json({ data: generateToken(user._id), user, verify });
  }
  return res.json({ message: "Invalid login credentials" });
});
//@desc     Get all admins
//@route    GET /api/v1/admins
//@access   Private
exports.getAdminsCtrl = async (req, res, next) => {
  try {
    res.send(req.userAuth);
  } catch (error) {
    next(error);
  }
};
//@desc     Get single admin
//@route    GET /api/v1/admins/:id
//@access   Private
exports.getAdminProfileCtrl = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc    update admin
//@route    UPDATE /api/v1/admins/:id
//@access   Private
exports.updateAdminCtrl = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     Delete admin
//@route    DELETE /api/v1/admins/:id
//@access   Private
exports.deleteAdminCtrl = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin suspends a teacher
//@route    PUT /api/v1/admins/suspend/teacher/:id
//@access   Private
exports.adminSuspendTeacherCtrl = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin unsuspends a teacher
//@route    PUT /api/v1/admins/unsuspend/teacher/:id
//@access   Private
exports.adminUnSuspendTeacherCtrl = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin withdraws a teacher
//@route    PUT /api/v1/admins/withdraw/teacher/:id
//@access   Private
exports.adminWithdrawTeacherCtrl = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin Unwithdraws a teacher
//@route    PUT /api/v1/admins/withdraw/teacher/:id
//@access   Private
exports.adminUnWithdrawTeacherCtrl = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin publich exam result
//@route    PUT /api/v1/admins/publish/exam/:id
//@access   Private
exports.adminPublishResultsCtrl = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin unpublish exam result
//@route    PUT /api/v1/admins/unpublish/exam/:id
//@access   Private
exports.adminUnPublishResultsCtrl = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
