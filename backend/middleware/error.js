const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  //Wrong mongodb id error
  if (err.name === "CastError" && err.path === "_id") {
    const message = `Resource not found. Invalid: ${err.path} : ${err.value}`;
    err = new ErrorHandler(message, 400);
}


  res.status(statusCode).json({
    success: false,
    //error: err.stack,
    error: {
        statusCode: statusCode,
        message: message
    }
  });
};
