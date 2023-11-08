const AsyncHandler = require("express-async-handler");
const { teacherModel } = require("../../model/Staff/teacherModel");
const { examModel } = require("../../model/Academic/examModel");

//@desc Create Exam
//@route GET /api/v1/exams
//@acess  Private Teacher Only
module.exports.createExam = AsyncHandler(async (req, res) => {
  const { name, description, subject, program, academicTerm, duration, examTime, examType, academicYear, classLevel } = req.body;

  // find teacher
  const teacherFound = await teacherModel.findById(req.userAuth?._id);
  if (!teacherFound) throw new Error("Teacher already exists");

  // exam exists
  const examExist = await examModel.findOne({ name });
  if (examExist) throw new Error("Exam already exists");

  // create
  const examCreated = new examModel({
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    duration,
    examTime,
    examType,
    subject,
    program,
    createdBy: req.userAuth?._id,
  });

  // push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);

  // save exam
  await examCreated.save();
  await teacherFound.save();

  res.status(201).json({
    status: "success",
    message: "Exam Created",
    data: examCreated,
  });
});

//@desc get all Exams
//@route GET /api/v1/exams/
//@acess  Private
module.exports.getExams = AsyncHandler(async (req, res) => {
  const exams = await examModel.find({});

  res.status(201).json({
    status: "success",
    message: "Exams feached successfully",
    data: exams,
  });
});

//@desc get single Exam
//@route GET /api/v1/exam/:id
//@acess  Private
module.exports.getExam = AsyncHandler(async (req, res) => {
  const exam = await examModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "exam feached successfully",
    data: exam,
  });
});

//@desc update Exam
//@route PUT /api/v1/exams/:id
//@acess  Private Teacher only
module.exports.updateExam = AsyncHandler(async (req, res) => {
  const { name, description, subject, program, academicTerm, duration, examTime, examType, academicYear, classLevel } = req.body;

  const examFound = await examModel.findOne({ name });

  if (examFound) throw new Error("Exam already exists");

  const examUpdated = await examModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      duration,
      examTime,
      examType,
      academicYear,
      classLevel,
      createdBy: req.userAuth?._id,
    },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    message: "subject updated successfully",
    data: examUpdated,
  });
});
