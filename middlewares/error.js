const constants = require('../utils/constants');

const customError = (err, req, res, next) => {
  const { statusCode = constants.SERVER_ERROR, message } = err;

  if (err.name === 'CastError') {
    res.status(constants.BAD_REQUEST).send({ message: constants.CAST_ERROR_MESSAGE });
  }
  if (err.name === 'ValidationError') {
    res.status(constants.BAD_REQUEST).send({ message: err.message });
  }
  if (err.code && err.code === 11000) {
    res.status(constants.CONFLICT).send({ message: constants.ALREADY_EXISTS_MESSAGE });
  }
  if (err.name === 'TypeError') {
    res.status(constants.UNAUTHORIZED).send({ message: constants.NO_ACCESS_MESSAGE });
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? constants.SERVER_ERROR_MESSAGE : message,
    });

  next();
};

module.exports = customError;
