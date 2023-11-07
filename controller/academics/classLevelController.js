const AsyncHandler = require("express-async-handler");
const { adminModel } = require("../../model/Staff/adminModel");
const { classLevelModel } = require("../../model/Academic/classLevelModel");

//@desc create Class Level
//@route POST /api/class-levels/
//@acess  Private
module.exports.createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // create
  const classFound = await classLevelModel.findOne({ name });
  if (classFound) {
    throw new Error("class already exists");
  }

  const classCreated = await classLevelModel.create({ name, description, createdBy: req.userAuth._id });

  // push class into admin
  const admin = await adminModel.findById(req.userAuth._id);
  admin.classLevels.push(classCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "class created successfully",
    data: classCreated,
  });
});

//@desc get all Class Levels
//@route GET /api/class-levels/
//@acess  Private
module.exports.getClassLevels = AsyncHandler(async (req, res) => {
  const classes = await classLevelModel.find({});

  res.status(201).json({
    status: "success",
    message: "Class Levels feached successfully",
    data: classes,
  });
});

//@desc get single Class Level
//@route GET /api/class-levels/:id
//@acess  Private
module.exports.getClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await classLevelModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "class feached successfully",
    data: classLevel,
  });
});

//@desc update Class Level
//@route PUT /api/class-levels/:id
//@acess  Private
module.exports.updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const classFound = await classLevelModel.findOne({ name });

  if (classFound) {
    throw new Error("class Level already exists");
  }

  const classLevel = await classLevelModel.findByIdAndUpdate(
    req.params.id,
    { name, description, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Class Level updated successfully",
    data: classLevel,
  });
});

//@desc delete Class Level
//@route DELETE /api/class-levels/:id
//@acess  Private
module.exports.deleteClassLevel = AsyncHandler(async (req, res) => {
  await classLevelModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Class Level Deleted successfully",
  });
});
