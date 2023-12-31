const AsyncHandler = require("express-async-handler");
const { examResultModel } = require("../../model/Academic/examResultModel");
const { studentModel } = require("../../model/Staff/studentModel");
const { examModel } = require("../../model/Academic/examModel");

//@desc Exam Result Cheking
//@route GET /api/v1/exam-results/:id/cheking
//@acess  Private Students only
module.exports.checkExamResults = AsyncHandler(async (req, res) => {
  // find the student
  const studentFound = await studentModel.findById(req.userAuth._id).select("-password");
  if (!studentFound) throw new Error("no Student Found");

  // find the exam result
  const examResult = await examResultModel
    .findOne({
      studentID: studentFound.studentId,
      _id: req.params.id,
    })
    .populate({
      path: "exam",
      populate: {
        path: "questions",
      },
    })
    .populate("classLevel")
    .populate("academicTerm")
    .populate("academicYear");

  //check if exam if published
  if (!examResult?.isPublished) throw new Error("Exam Result is not available , check out later");

  res.status(200).json({
    status: "success",
    message: "Exam Result",
    data: examResult,
    student: studentFound,
  });
});

//@desc Get All Exam Results (name , id)
//@route GET /api/v1/exam-results
//@acess  Private Students only
module.exports.getAllExamResults = AsyncHandler(async (req, res) => {
  const reuslt = await examResultModel.find({}).select("exam").populate("exam");

  res.status(200).json({
    status: "success",
    message: "Exam Results Fetched",
    data: reuslt,
  });
});

//@desc Admin publush exam result
//@route PUT /api/v1/exam-results/:id/amdin-toggle-publish
//@acess  Private admin only
module.exports.adminToggleExamResult = AsyncHandler(async (req, res) => {
  const { publish } = req.body;
  // find exam Results
  const examResult = await examResultModel.findById(req.params.id);
  if (!examResult) throw new Error("exam result not found");

  const publishResult = await examResultModel.findByIdAndUpdate(req.params.id, { isPublished: publish }, { new: true });

  // const reuslt = await examResultModel.find({}).select("exam").populate("exam");

  res.status(200).json({
    status: "success",
    message: "Exam Result Updated",
    data: publishResult,
  });
});
