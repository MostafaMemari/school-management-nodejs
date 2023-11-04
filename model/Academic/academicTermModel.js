const mongoose = require("mongoose");

const { Schema } = mongoose;

const academicTermSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "3 months",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const academicTermModel = mongoose.model("AcademicTerm", academicTermSchema);

module.exports = { academicTermModel };
