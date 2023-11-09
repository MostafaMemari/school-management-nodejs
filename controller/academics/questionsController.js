const AsyncHandler = require("express-async-handler");
const { examModel } = require("../../model/Academic/examModel");
const { questionModel } = require("../../model/Academic/questionModel");

//@desc Create Question
//@route DELETE /api/v1/questions/:examID
//@acess  Private Teachers Only
module.exports.createQuestion = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

  // find the exam
  const examFound = await examModel.findById(req.params.examID);
  if (!examFound) throw new Error("Exam not found");

  // check if question
  const questionExists = await questionModel.findOne({ question });
  if (questionExists) throw new Error("Question already exists");

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

//@desc Get All Questions
//@route GET /api/v1/questions/
//@acess  Private Teacher Only
module.exports.getQuestions = AsyncHandler(async (req, res) => {
  const questions = await questionModel.find({});

  res.status(200).json({
    status: "success",
    message: "Questions feached successfully",
    data: questions,
  });
});

//@desc Get Single Questions
//@route GET /api/v1/questions/:id
//@acess  Private Teacher Only
module.exports.getQuestion = AsyncHandler(async (req, res) => {
  const question = await questionModel.findById(req.params.id);

  if (!question) throw new Error("question not found");

  res.status(200).json({
    status: "success",
    message: "Question feached successfully",
    data: question,
  });
});

//@desc update question
//@route PUT /api/v1/questions/:id
//@acess  Private
module.exports.updateQuestion = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

  const questionFound = await questionModel.findOne({ question });
  if (questionFound) throw new Error("question already exists");

  const questionUpdated = await questionModel.findByIdAndUpdate(
    req.params.id,
    { question, optionA, optionB, optionC, optionD, correctAnswer, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    message: "Question updated successfully",
    data: questionUpdated,
  });
});
