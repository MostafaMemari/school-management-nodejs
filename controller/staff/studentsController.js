const AsyncHandler = require("express-async-handler");
const { studentModel } = require("../../model/Staff/studentModel");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const { generateToken } = require("../../utils/generateToken");
const { examModel } = require("../../model/Academic/examModel");
const { examResultModel } = require("../../model/Academic/examResultModel");

//@desc Admin Register Student
//@route PUT /api/v1/students/admin/register
//@acess  Private Admin Only
module.exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const student = await studentModel.findOne({ email });
  if (student) {
    throw new Error("student already employed");
  }

  // Hash Password
  const hashedPassword = await hashPassword(password);

  // create
  const studentRegistered = await studentModel.create({ name, email, password: hashedPassword });

  res.status(201).json({
    status: "success",
    message: "student registered successfully",
    data: studentRegistered,
  });
});

//@desc Login a Student
//@route PUT /api/v1/students/login/
//@acess  Private
module.exports.loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await studentModel.findOne({ email });
  if (!student) throw { message: "Invalid login credentials" };

  const isMached = await isPassMatched(password, student.password);

  if (!isMached) throw { message: "Invalid login credentials" };

  res.status(200).json({
    status: "success",
    message: "Student Login Successfully",
    data: generateToken(student?._id),
  });
});

//@desc Student Profile
//@route PUT /api/v1/students/profile
//@acess  Private admin only
module.exports.studentProfile = AsyncHandler(async (req, res) => {
  const student = await studentModel.findById(req.userAuth._id).select("-password -createdAt -updatedAt");

  if (!student) throw new Error("student not Found");

  res.status(200).json({
    status: "success",
    message: "student Profile fetched Successfully",
    data: student,
  });
});

//@desc Get All Students
//@route PUT /api/v1/students
//@acess  Private admin only
module.exports.studentsAdmin = AsyncHandler(async (req, res) => {
  const students = await studentModel.find({});

  res.status(200).json({
    status: "success",
    message: "students fetched Successfully",
    data: students,
  });
});

//@desc Get Single Student
//@route PUT /api/v1/students/:studentID/amdin
//@acess  Private admin only
module.exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
  const { studentID } = req.params;

  const student = await studentModel.findById(studentID);

  if (!student) throw new Error("Student not Found");

  res.status(200).json({
    status: "success",
    message: "Student fetched Successfully",
    data: student,
  });
});

//@desc Student Updating Profile
//@route PUT /api/v1/students/update
//@acess  Private Student only
module.exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const emailExist = await studentModel.findOne({ email });
  if (emailExist) throw new Error("this Email is exist");

  if (password) {
    const passwordHashed = await hashPassword(password);
    const student = await studentModel.findByIdAndUpdate(
      req.userAuth._id,
      { email, password: passwordHashed },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "Student updated successfully...",
    });
  } else {
    const student = await studentModel.findByIdAndUpdate(req.userAuth._id, { email }, { new: true, runValidators: true });
    res.status(200).json({
      status: "success",
      data: student,
      message: "Student updated successfully...",
    });
  }
});

//@desc Admin Updating Student eq: Assigning classes...
//@route PUT /api/v1/students/:studentID/update/admin
//@acess  Private Admin only
module.exports.adminUpdatestudent = AsyncHandler(async (req, res) => {
  const { classLevels, academicYear, program, prefectName, name, email } = req.body;

  // find the students by id
  const student = await studentModel.findById(req.params.studentID);
  if (!student) throw new Error("student not Found");

  // update
  const studentUpdated = await studentModel.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        prefectName,
      },
      $addToSet: {
        classLevels,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: studentUpdated,
    message: "Student Updated Successfully...",
  });
});

//@desc Student taking Exam
//@route POST /api/v1/students/exam/:examID/write
//@acess  Private Students only
module.exports.writeExam = AsyncHandler(async (req, res) => {
  const studentFound = await studentModel.findById(req.userAuth._id);
  if (!studentFound) throw new Error("Student not found");

  const examFound = await examModel.findById(req.params.examID).populate("questions").populate("academicTerm");
  if (!examFound) throw new Error("Exam not found");

  // check if student has already taken the exams
  // const studentFoundInResults = await examResultModel.findOne({ student: studentFound?._id, exam: examFound?._id });
  // if (studentFoundInResults) throw new Error("You have already written this exam");

  // get questions
  const questions = examFound?.questions;

  // get students questions
  const studentAnswers = req.body.answers;

  // Build report object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let grade = 0;
  let score = 0;
  let status = ""; // failed - passed
  let remarks = "";
  let answeredQuestions = [];

  // check if student answered all questions
  // if (studentAnswers.length !== questions.length) throw new Error("You have not answered all the questions");

  // check for Answers
  for (let i = 0; i < questions.length; i++) {
    // find the questions
    const question = questions[i];

    //check if the answer is corrent
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }

  // calculate reports

  grade = (correctAnswers / questions.length) * 100;
  answeredQuestions = questions.map((question) => {
    return {
      question: question.question,
      correctAnswers: question.correctAnswer,
      isCorrect: question.isCorrect,
    };
  });

  // grade >= 50 ? (status = "Passed") : (status = "Failed");

  // Remark
  // switch (true) {
  //   case grade >= 80:
  //     remarks = "Excellent";
  //     break;
  //   case grade >= 70:
  //     remarks = "Good";
  //     break;
  //   case grade >= 50:
  //     remarks = "Fair";
  //     break;
  //   default:
  //     remarks = "Poor";
  // }

  status = grade >= 50 ? "Pass" : "Fail";
  remarks = grade >= 80 ? "Excellent" : grade >= 70 ? "Good" : grade >= 50 ? "Fair" : "Poor";

  // create Exam Results
  // const examResult = await examResultModel.create({
  //   student: studentFound._id,
  //   exam: examFound?._id,
  //   grade,
  //   score,
  //   status,
  //   remarks,
  //   classLevel: examFound?.classLevel,
  //   academicTerm: examFound?.academicTerm,
  //   academicYear: examFound?.academicYear,
  // });

  // push the result into
  // studentFound.examResults.push(examResult?._id);
  // await studentFound.save();

  // Promoting
  // promote student to level 200
  if (examFound.academicTerm.name === "3st term" && status === "Pass" && studentFound?.currentClassLevel === "Level 100") {
    studentFound.classLevels.addToSet("Level 200");
    studentFound.currentClassLevel = "Level 200";
    await studentFound.save();
  }
  // promote student to level 300
  if (examFound.academicTerm.name === "3st term" && status === "Pass" && studentFound?.currentClassLevel === "Level 200") {
    studentFound.classLevels.addToSet("Level 300");
    studentFound.currentClassLevel = "Level 300";
    await studentFound.save();
  }
  // promote student to level 400
  if (examFound.academicTerm.name === "3st term" && status === "Pass" && studentFound?.currentClassLevel === "Level 300") {
    studentFound.classLevels.addToSet("Level 400");
    studentFound.currentClassLevel = "Level 400";
    await studentFound.save();
  }
  res.status(200).json({
    status,
    studentFound,
    remarks,
    correctAnswers,
    wrongAnswers,
    score,
    grade,
    answeredQuestions,
    // examResult,
  });
});
