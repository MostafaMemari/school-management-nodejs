const AsyncHandler = require("express-async-handler");
const { examModel } = require("../../model/Academic/examModel");
const { questionModel } = require("../../model/Academic/questionModel");

//@desc Create Question
//@route DELETE /api/v1/:examID/questions
//@acess  Private Teachers Only
module.exports.createQuestion = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

  // find the exam
  const examFound = await examModel.findById(req.params.examID);
  if (!examFound) throw new Error("Error not found");

  // create Exam
  const questionCreated = await questionModel.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth._id,
  });
  // add the question into exam
  examFound.questions.push(questionCreated?._id);
  await examFound.save();

  res.status(201).json({
    status: "success",
    message: "Question Created !",
    data: questionCreated,
  });
});
