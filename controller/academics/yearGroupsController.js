const AsyncHandler = require("express-async-handler");
const { yearGroupModel } = require("../../model/Academic/yearGroupModel");
const { adminModel } = require("../../model/Staff/adminModel");

//@desc create year group
//@route POST /api/years-groups/
//@acess  Private
module.exports.createYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  // create
  const yearGroupFound = await yearGroupModel.findOne({ name });
  if (yearGroupFound) {
    throw new Error("Year Group already exists");
  }

  const yearGroupCreated = await yearGroupModel.create({ name, academicYear, createdBy: req.userAuth._id });

  const admin = await adminModel.findById(req.userAuth._id);
  admin.yearGroups.push(yearGroupCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Year Group created successfully",
    data: yearGroupCreated,
  });
});

//@desc get all year group
//@route GET /api/years-groups/
//@acess  Private
module.exports.getYearGroups = AsyncHandler(async (req, res) => {
  const yearGroups = await yearGroupModel.find({});

  res.status(201).json({
    status: "success",
    message: "Year Groups feached successfully",
    data: yearGroups,
  });
});

//@desc get single year group
//@route GET /api/years-groups/:id
//@acess  Private
module.exports.getYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await yearGroupModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Year Group feached successfully",
    data: yearGroup,
  });
});

//@desc update year group
//@route PUT /api/years-groups/:id
//@acess  Private
module.exports.updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  const yearGroupFound = await yearGroupModel.findOne({ name });

  if (yearGroupFound) {
    throw new Error("Year Group already exists");
  }

  const yearGroup = await yearGroupModel.findByIdAndUpdate(
    req.params.id,
    { name, academicYear, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Year Group updated successfully",
    data: yearGroup,
  });
});

//@desc delete year group
//@route DELETE /api/years-groups/:id
//@acess  Private
module.exports.deleteYearGroup = AsyncHandler(async (req, res) => {
  await yearGroupModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "yearGroup Deleted successfully",
  });
});
