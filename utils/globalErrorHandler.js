const AppError = require("./appError");
// NODE_ENV declaration
const NODE_ENV = process.env.NODE_ENV;

// Sending errors in development mode
const sendErrorDevelopment = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack
  });
}
// Sending errors in production mode
const sendErrorProduction = (error, res) => {

  // Operational errors that we can detect
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    // Errors we cannot detect
    console.log('ERROR', error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong'
    });
  };
};

// Handling DB errors
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400)
}
// Handling duplicate values in DB
const handleDuplicateFields = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field values for ${value}. Please use another value`;
  return new AppError(message, 400);
}
// Handling DB validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const globalErrorHandler = (error, req, res, next) => {
  // statusCode means the code of the status of the request and status is the actual status of the request(coming from the Error class)
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (NODE_ENV == 'development') {
    sendErrorDevelopment(error, res);
  } else if (NODE_ENV == 'production') {
    let err = { ...error };
    // If it is a cast error
    if (err.name == 'CastError') error = handleCastError(error);
    // If it is a duplicate fields error
    if (err.code == 11000) error = handleDuplicateFields(error);
    // If it is a validation error
    if (err.name == 'ValidationError') error = handleValidationError(error);
    sendErrorProduction(error, res);
  }
}
module.exports = globalErrorHandler;