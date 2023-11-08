const AsyncHandler = require("express-async-handler");
const { studentModel } = require("../../model/Staff/studentModel");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const { generateToken } = require("../../utils/generateToken");

//@desc Admin Register Student
//@route PUT /api/v1/students/admin/register
//@acess  Private Admin Only
module.exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const student = await studentModel.findOne({ email });
  if (student) {
    throw new Error("student already employed");
  }

  // Hash Password
  const hashedPassword = await hashPassword(password);

  // create
  const studentRegistered = await studentModel.create({ name, email, password: hashedPassword });

  res.status(201).json({
    status: "success",
    message: "student registered successfully",
    data: studentRegistered,
  });
});

//@desc Login a Student
//@route PUT /api/v1/students/login/
//@acess  Private
module.exports.loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await studentModel.findOne({ email });
  if (!student) throw { message: "Invalid login credentials" };

  const isMached = await isPassMatched(password, student.password);

  if (!isMached) throw { message: "Invalid login credentials" };

  res.status(200).json({
    status: "success",
    message: "Student Login Successfully",
    data: generateToken(student?._id),
  });
});

//@desc Student Profile
//@route PUT /api/v1/students/profile
//@acess  Private admin only
module.exports.studentProfile = AsyncHandler(async (req, res) => {
  const student = await studentModel.findById(req.userAuth._id).select("-password -createdAt -updatedAt");

  if (!student) throw new Error("student not Found");

  res.status(200).json({
    status: "success",
    message: "student Profile fetched Successfully",
    data: student,
  });
});
