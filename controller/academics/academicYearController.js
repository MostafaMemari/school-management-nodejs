const AsyncHandler = require("express-async-handler");
const { academicYearModel } = require("../../model/Academic/academicYearModel");
const { adminModel } = require("../../model/Staff/adminModel");

//@desc create Academic Year
//@route POST /api/academic-years/
//@acess  Private
module.exports.createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  // create
  const academicYear = await academicYearModel.findOne({ name });
  if (academicYear) {
    throw new Error("Academic year already exists");
  }

  const academicYearCreated = await academicYearModel.create({ name, fromYear, toYear, createdBy: req.userAuth._id });

  // push academic into admin
  const admin = await adminModel.findById(req.userAuth._id);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Academic Year created successfully",
    data: academicYearCreated,
  });
});

//@desc get all Academic Years
//@route GET /api/academic-years/
//@acess  Private
module.exports.getAcademicYears = AsyncHandler(async (req, res) => {
  const academicYears = await academicYearModel.find({});

  res.status(201).json({
    status: "success",
    message: "Academic Year feached successfully",
    data: academicYears,
  });
});

//@desc get single Academic Year
//@route GET /api/academic-years/:id
//@acess  Private
module.exports.getAcademicYear = AsyncHandler(async (req, res) => {
  const academicYear = await academicYearModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic Year feached successfully",
    data: academicYear,
  });
});

//@desc update Academic Year
//@route PUT /api/academic-years/:id
//@acess  Private
module.exports.updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  const createAcademicYearFound = await academicYearModel.findOne({ name });

  if (createAcademicYearFound) {
    throw new Error("Academic year already exists");
  }

  const academicYear = await academicYearModel.findByIdAndUpdate(
    req.params.id,
    { name, fromYear, toYear, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Academic Year updated successfully",
    data: academicYear,
  });
});

//@desc delete Academic Year
//@route DELETE /api/academic-years/:id
//@acess  Private
module.exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
  await academicYearModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic Year Deleted successfully",
  });
});
