const AsyncHandler = require("express-async-handler");
const { adminModel } = require("../../model/Staff/adminModel");
const { programModel } = require("../../model/Academic/programModel");
const { subjectModel } = require("../../model/Academic/subjectModel");

//@desc create program
//@route POST /api/v1/programs/
//@acess  Private
module.exports.createProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // create
  const programFound = await programModel.findOne({ name });
  if (programFound) {
    throw new Error("program already exists");
  }

  const programCreated = await programModel.create({ name, description, createdBy: req.userAuth._id });

  // push program into admin
  const admin = await adminModel.findById(req.userAuth._id);
  admin.programs.push(programCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "program created successfully",
    data: programCreated,
  });
});

//@desc get all programs
//@route GET /api/v1/programs/
//@acess  Private
module.exports.getPrograms = AsyncHandler(async (req, res) => {
  const programs = await programModel.find({});

  res.status(200).json({
    status: "success",
    message: "programs feached successfully",
    data: programs,
  });
});

//@desc get single program
//@route GET /api/v1/programs/:id
//@acess  Private
module.exports.getProgram = AsyncHandler(async (req, res) => {
  const Program = await programModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "program feached successfully",
    data: Program,
  });
});

//@desc update program
//@route PUT /api/v1/programs/:id
//@acess  Private
module.exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const programFound = await programModel.findOne({ name });

  if (programFound) {
    throw new Error("program already exists");
  }

  const Program = await programModel.findByIdAndUpdate(req.params.id, { name, description, createdBy: req.userAuth._id }, { new: true });

  res.status(200).json({
    status: "success",
    message: "program updated successfully",
    data: Program,
  });
});

//@desc delete program
//@route DELETE /api/v1/programs/:id
//@acess  Private
module.exports.deleteProgram = AsyncHandler(async (req, res) => {
  await programModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "program Deleted successfully",
  });
});
