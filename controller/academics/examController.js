const AsyncHandler = require("express-async-handler");
const { teacherModel } = require("../../model/Staff/teacherModel");
const { examModel } = require("../../model/Academic/examModel");

//@desc Create Exam
//@route GET /api/v1/exam
//@acess  Private Teachers Only
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
