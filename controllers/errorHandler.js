/* eslint-disable prettier/prettier */
const AppError = require('../utils/appError');

// eslint-disable-next-line prettier/prettier
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// eslint-disable-next-line prettier/prettier
const handleDuplicateFieldsDB = err => {
  const value = err.keyValue.name;
  // console.log(value);
  // eslint-disable-next-line no-useless-escape
  const message = `Duplicate field value \ " ${value} " \ , please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);

}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //programming or unknow error: dont leak error details to client
    //1)log error
    // eslint-disable-next-line no-console
    console.error('ERROR 🔥', err);

    //2)send generic message
    res.status(500).json({
      status: 'error',
      message: 'Sorry, something went wrong!',
    });
  }
};

/* eslint-disable no-unused-expressions */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
