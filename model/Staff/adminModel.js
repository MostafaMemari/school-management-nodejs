const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    academicTerms: [
      {
        type: mongoose.Types.ObjectId,
        ref: "AcademicTerm",
      },
    ],
    academicYears: [
      {
        type: mongoose.Types.ObjectId,
        ref: "AcademicYear",
      },
    ],
    classLevels: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClassLevel",
      },
    ],
    programs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Program",
      },
    ],
    yearGroups: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Program",
      },
    ],
    teachers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = {
  adminModel,
};
