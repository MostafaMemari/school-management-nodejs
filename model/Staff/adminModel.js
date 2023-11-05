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
  },
  { timestamps: true, versionKey: false }
);

// Hash Password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Verify Password
adminSchema.methods.verifyPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = {
  adminModel,
};
