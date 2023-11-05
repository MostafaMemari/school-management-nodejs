const notFoundError = (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the Server`);

  next(error);
};

const globalErrorHandler = (error, req, res, next) => {
  const stack = error.stack;
  const message = error.message;
  const status = error.status ? error.status : "failed";
  const statusCode = error.statusCode ? error.statusCode : 500;

  res.status(statusCode).json({ status, message, stack });
};

module.exports = {
  globalErrorHandler,
  notFoundError,
};
