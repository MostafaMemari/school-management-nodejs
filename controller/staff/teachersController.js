const AsyncHandler = require("express-async-handler");
const { teacherModel } = require("../../model/Staff/teacherModel");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const { generateToken } = require("../../utils/generateToken");

//@desc Admin Register Teacher
//@route PUT /api/v1/teachers/admin/register
//@acess  Private
module.exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const teacher = await teacherModel.findOne({ email });
  if (teacher) {
    throw new Error("Teacher already employed");
  }

  // Hash Password
  const hashedPassword = await hashPassword(password);

  // create
  const teacherCreated = await teacherModel.create({ name, email, password: hashedPassword });

  res.status(201).json({
    status: "success",
    message: "Teacher registered successfully",
    data: teacherCreated,
  });
});

//@desc Login a Teacher
//@route PUT /api/v1/teachers/login/
//@acess  Private
module.exports.loginTeacher = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const teacher = await teacherModel.findOne({ email });
  if (!teacher) throw { message: "Invalid login credentials" };

  const isMached = await isPassMatched(password, teacher.password);

  if (!isMached) throw { message: "Invalid login credentials" };

  res.status(200).json({
    status: "success",
    message: "Teacher Login Successfully",
    data: generateToken(teacher?._id),
  });
});

//@desc Get All Teachers
//@route PUT /api/v1/teachers
//@acess  Private admin only
module.exports.getAllTeachersAdmin = AsyncHandler(async (req, res) => {
  const teachers = await teacherModel.find({});

  res.status(200).json({
    status: "success",
    message: "Teachers fetched Successfully",
    data: teachers,
  });
});

//@desc Get Single Teacher
//@route PUT /api/v1/teachers/:teacherID/amdin
//@acess  Private admin only
module.exports.getTeacherByAdmin = AsyncHandler(async (req, res) => {
  const { teacherID } = req.params;

  const teacher = await teacherModel.findById(teacherID);

  if (!teacher) throw new Error("Teacher not Found");

  res.status(200).json({
    status: "success",
    message: "Teacher fetched Successfully",
    data: teacher,
  });
});
