const AsyncHandler = require("express-async-handler");

const { adminModel } = require("../../model/Staff/adminModel");
const { generateToken } = require("../../utils/generateToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");

//@desc Register admin
//@route POST /api/v1/admins/register

//@acess  Private
exports.registerAdmCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const amdinFound = await adminModel.findOne({ email });
  if (amdinFound) throw new Error("Admin Exists");

  const passwordHashed = await hashPassword(password);

  const user = await adminModel.create({ name, email, password: passwordHashed });

  res.status(201).json({
    status: "success",
    data: user,
    message: "Admin Registered Successfully",
  });
});
//@desc     login admins
//@route    POST /api/v1/admins/login
//@access   Private
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await adminModel.findOne({ email });

  if (!user) return res.json({ message: "Invalid login credentials" });

  const isMached = await isPassMatched(password, user.password);

  if (!isMached) return res.json({ message: "Invalid login credentials" });
  else return res.json({ data: generateToken(user._id), message: "Admin logged in successfuly" });
});
//@desc     Get all admins
//@route    GET /api/v1/admins
//@access   Private
exports.getAdminsCtrl = AsyncHandler(async (req, res) => {
  // const amdins = await adminModel.find({});

  res.status(200).json(res.result);
});
//@desc     Get single admin
//@route    GET /api/v1/admins/:id
//@access   Private
exports.getAdminProfileCtrl = AsyncHandler(async (req, res) => {
  const admin = await adminModel
    .findById(req.userAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears")
    .populate("academicTerms")
    .populate("programs")
    .populate("yearGroups")
    .populate("classLevels")
    .populate("teachers")
    .populate("students");
  console.log(admin);
  if (!admin) {
    throw new Error("Admin Not Found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin Profile fetched successfully",
    });
  }
});
//@desc    update admin
//@route    UPDATE /api/v1/admins/:id
//@access   Private
exports.updateAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const emailExist = await adminModel.findOne({ email });
  if (emailExist) throw new Error("this Email is Token/exist");

  if (password) {
    const passwordHashed = await hashPassword(password);
    const admin = await adminModel.findByIdAndUpdate(
      req.userAuth._id,
      { email, password: passwordHashed, name },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully...",
    });
  } else {
    const admin = await adminModel.findByIdAndUpdate(req.userAuth._id, { email, name }, { new: true, runValidators: true });
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully...",
    });
  }
});

//@desc     Delete admin
//@route    DELETE /api/v1/admins/:id
//@access   Private
exports.deleteAdminCtrl = (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin suspends a teacher
//@route    PUT /api/v1/admins/suspend/teacher/:id
//@access   Private
exports.adminSuspendTeacherCtrl = (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin unsuspends a teacher
//@route    PUT /api/v1/admins/unsuspend/teacher/:id
//@access   Private
exports.adminUnSuspendTeacherCtrl = (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin withdraws a teacher
//@route    PUT /api/v1/admins/withdraw/teacher/:id
//@access   Private
exports.adminWithdrawTeacherCtrl = (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin Unwithdraws a teacher
//@route    PUT /api/v1/admins/withdraw/teacher/:id
//@access   Private
exports.adminUnWithdrawTeacherCtrl = (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin publich exam result
//@route    PUT /api/v1/admins/publish/exam/:id
//@access   Private
exports.adminPublishResultsCtrl = (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
//@desc     admin unpublish exam result
//@route    PUT /api/v1/admins/unpublish/exam/:id
//@access   Private
exports.adminUnPublishResultsCtrl = (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
