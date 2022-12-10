/* eslint-disable no-unused-vars */
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const OK = 200;
const CREATED = 201;

const SERVER_ERROR_MESSAGE = 'Oops! Something went wrong...';
const NOT_FOUND_MESSAGE = 'The requested object was not found';
const CAST_ERROR_MESSAGE = 'Error! Incorrect request to the server';
const ALREADY_EXISTS_MESSAGE = 'User with specified email already exists';

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  OK,
  CREATED,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  CAST_ERROR_MESSAGE,
  ALREADY_EXISTS_MESSAGE,
};
