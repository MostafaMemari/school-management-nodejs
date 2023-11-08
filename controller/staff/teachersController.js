const AsyncHandler = require("express-async-handler");
const { teacherModel } = require("../../model/Staff/teacherModel");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const { generateToken } = require("../../utils/generateToken");

//@desc Admin Register Teacher
//@route PUT /api/v1/teachers/admin/register
//@acess  Private Admin Only
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

//@desc Teacher Profile
//@route PUT /api/v1/teachers/profile
//@acess  Private admin only
module.exports.getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await teacherModel.findById(req.userAuth._id).select("-password -createdAt -updatedAt");

  if (!teacher) throw new Error("Teacher not Found");

  res.status(200).json({
    status: "success",
    message: "Teacher Profile fetched Successfully",
    data: teacher,
  });
});

//@desc Teacher Updating Profile
//@route PUT /api/v1/teachers/update
//@acess  Private Teacher only
module.exports.teacherUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const emailExist = await teacherModel.findOne({ email });
  if (emailExist) throw new Error("this Email is Token/exist");

  if (password) {
    const passwordHashed = await hashPassword(password);
    const teacher = await teacherModel.findByIdAndUpdate(
      req.userAuth._id,
      { email, password: passwordHashed, name },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher updated successfully...",
    });
  } else {
    const teacher = await teacherModel.findByIdAndUpdate(req.userAuth._id, { email, name }, { new: true, runValidators: true });
    res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher updated successfully...",
    });
  }
});

//@desc Admin updating Teacher Profile
//@route PUT /api/v1/teachers/:teacherID/admin
//@acess  Private Admin only
module.exports.adminUpdateTeacher = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;

  const teacher = await teacherModel.findById(req.params.teacherID);
  if (!teacher) throw new Error("Teacher not Found");

  // check if teacher is Withdrawn
  if (teacher.isWithdrawn) {
    throw new Error("Action Denied , teacher is Withdrawn");
  }

  // assign a program
  if (program) {
    teacher.program = program;
    await teacher.save();
  }
  // assign class level
  if (classLevel) {
    teacher.classLevel = classLevel;
    await teacher.save();
  }
  // assign academic year
  if (academicYear) {
    teacher.academicYear = academicYear;
    await teacher.save();
  }
  // assign subject
  if (subject) {
    teacher.subject = subject;
    await teacher.save();
  }

  res.status(200).json({
    status: "success",
    data: teacher,
    message: "Teacher updated successfully...",
  });
});
