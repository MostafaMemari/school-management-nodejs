const AsyncHandler = require("express-async-handler");
const { subjectModel } = require("../../model/Academic/subjectModel");
const { programModel } = require("../../model/Academic/programModel");

//@desc create subject
//@route POST /api/v1/subjects/:programID
//@acess  Private
module.exports.createSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  // find Program
  const programFound = await programModel.findById(req.params.programID);
  if (!programFound) {
    throw new Error("program Not Found");
  }
  // create
  const subjectFound = await subjectModel.findOne({ name });
  if (subjectFound) {
    throw new Error("subject already exists");
  }

  const subjectCreated = await subjectModel.create({ name, description, academicTerm, createdBy: req.userAuth._id });

  // push to the program
  programFound.subjects.push(subjectCreated._id);
  programFound.save();

  res.status(201).json({
    status: "success",
    message: "subject created successfully",
    data: subjectCreated,
  });
});

//@desc get all subjects
//@route GET /api/v1/subjects/
//@acess  Private
module.exports.getSubjects = AsyncHandler(async (req, res) => {
  const subjects = await subjectModel.find({});

  res.status(201).json({
    status: "success",
    message: "subjects feached successfully",
    data: subjects,
  });
});

//@desc get single subject
//@route GET /api/v1/subjects/:id
//@acess  Private
module.exports.getSubject = AsyncHandler(async (req, res) => {
  const subject = await subjectModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "subject feached successfully",
    data: subject,
  });
});

//@desc update subject
//@route PUT /api/v1/subjects/:id
//@acess  Private
module.exports.updateSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  const subjectFound = await subjectModel.findOne({ name });

  if (subjectFound) {
    throw new Error("subject already exists");
  }

  const subject = await subjectModel.findByIdAndUpdate(
    req.params.id,
    { name, description, academicTerm, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "subject updated successfully",
    data: subject,
  });
});

//@desc delete subject
//@route DELETE /api/v1/subjects/:id
//@acess  Private
module.exports.deleteSubject = AsyncHandler(async (req, res) => {
  await subjectModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "subject Deleted successfully",
  });
});
