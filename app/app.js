const express = require("express");
const morgan = require("morgan");
const { adminRouter } = require("../routes/staff/adminRouter");

const app = express();

// =========== Middleware =========== //
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/admins", adminRouter);

app.use((req, res, next) => {
  res.send("HELOO ERROR");
});
app.use((error, req, res, next) => {
  res.json({
    status: error.status,
    message: error.message,
  });
});

module.exports = { app };
