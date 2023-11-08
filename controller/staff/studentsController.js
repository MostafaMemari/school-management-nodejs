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

//@desc Get All Students
//@route PUT /api/v1/students
//@acess  Private admin only
module.exports.studentsAdmin = AsyncHandler(async (req, res) => {
  const students = await studentModel.find({});

  res.status(200).json({
    status: "success",
    message: "students fetched Successfully",
    data: students,
  });
});

//@desc Get Single Student
//@route PUT /api/v1/students/:studentID/amdin
//@acess  Private admin only
module.exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
  const { studentID } = req.params;

  const student = await studentModel.findById(studentID);

  if (!student) throw new Error("Student not Found");

  res.status(200).json({
    status: "success",
    message: "Student fetched Successfully",
    data: student,
  });
});

//@desc Student Updating Profile
//@route PUT /api/v1/students/update
//@acess  Private Student only
module.exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const emailExist = await studentModel.findOne({ email });
  if (emailExist) throw new Error("this Email is exist");

  if (password) {
    const passwordHashed = await hashPassword(password);
    const student = await studentModel.findByIdAndUpdate(
      req.userAuth._id,
      { email, password: passwordHashed },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "Student updated successfully...",
    });
  } else {
    const student = await studentModel.findByIdAndUpdate(req.userAuth._id, { email }, { new: true, runValidators: true });
    res.status(200).json({
      status: "success",
      data: student,
      message: "Student updated successfully...",
    });
  }
});
