const AsyncHandler = require("express-async-handler");
const { adminModel } = require("../../model/Staff/adminModel");
const { academicTermModel } = require("../../model/Academic/academicTermModel");

//@desc create Academic Term Year
//@route POST /api/v1/academic-terms/
//@acess  Private
module.exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  // create
  const academicTerm = await academicTermModel.findOne({ name });
  if (academicTerm) {
    throw new Error("Academic Term already exists");
  }

  const academicTermCreated = await academicTermModel.create({ name, description, duration, createdBy: req.userAuth._id });

  // push academic into admin
  const admin = await adminModel.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Academic Term created successfully",
    data: academicTermCreated,
  });
});

//@desc get all Academic Terms
//@route GET /api/v1/academic-terms/
//@acess  Private
module.exports.getAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerm = await academicTermModel.find({});

  res.status(201).json({
    status: "success",
    message: "Academic Terms feached successfully",
    data: academicTerm,
  });
});

//@desc get single Academic Term
//@route GET /api/v1/academic-terms/:id
//@acess  Private
module.exports.getAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await academicTermModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic Term feached successfully",
    data: academicTerm,
  });
});

//@desc update Academic Term
//@route PUT /api/v1/academic-terms/:id
//@acess  Private
module.exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  const createAcademicTermFound = await academicTermModel.findOne({ name });

  if (createAcademicTermFound) {
    throw new Error("Academic Term already exists");
  }

  const academicTerm = await academicTermModel.findByIdAndUpdate(
    req.params.id,
    { name, description, duration, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Academic Term updated successfully",
    data: academicTerm,
  });
});

//@desc delete Academic Term
//@route DELETE /api/v1/academic-terms/:id
//@acess  Private
module.exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
  await academicTermModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic Term Deleted successfully",
  });
});
