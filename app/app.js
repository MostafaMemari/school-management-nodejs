const express = require("express");
const morgan = require("morgan");
const { adminRouter } = require("../routes/staff/adminRouter");
const { globalErrorHandler, notFoundError } = require("../middlewares/globalErrorHandler");
const { academicYearRouter } = require("../routes/academics/academicYearRouter");
const { academicTermRouter } = require("../routes/academics/academicTermRouter");
const { classLevelRouter } = require("../routes/academics/classLevelRouter");

const app = express();

// =========== Middleware =========== //
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);

// =========== Error Middleware =========== //
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = { app };
