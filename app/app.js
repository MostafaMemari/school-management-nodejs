const express = require("express");
const morgan = require("morgan");

const { globalErrorHandler, notFoundError } = require("../middlewares/globalErrorHandler");

const { adminRouter } = require("../routes/staff/adminRouter");
const { academicYearRouter } = require("../routes/academics/academicYearRouter");
const { academicTermRouter } = require("../routes/academics/academicTermRouter");
const { classLevelRouter } = require("../routes/academics/classLevelRouter");
const { programRouter } = require("../routes/academics/programRouter.js");
const { subjectRouter } = require("../routes/academics/subjectsRouter.js");
const { yearGroupRouter } = require("../routes/academics/subjectRouter.js");

const app = express();

// =========== Middleware =========== //
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/years-groups", yearGroupRouter);

// =========== Error Middleware =========== //
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = { app };
