const express = require("express");
const morgan = require("morgan");
const { adminRouter } = require("../routes/staff/adminRouter");
const { globalErrorHandler, notFoundError } = require("../middlewares/globalErrorHandler");
const { academicYearRouter } = require("../routes/academics/academicYearRouter");

const app = express();

// =========== Middleware =========== //
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);

// =========== Error Middleware =========== //
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = { app };
