/* eslint-disable no-unused-vars */
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const OK = 200;
const CREATED = 201;
const CONFLICT = 409;

const SERVER_ERROR_MESSAGE = 'Oops! Something went wrong...';
const NOT_FOUND_MESSAGE = 'The requested object was not found';
const CAST_ERROR_MESSAGE = 'Error! Incorrect request to the server';
const ALREADY_EXISTS_MESSAGE = 'User with specified email already exists';
const NO_ACCESS_MESSAGE = 'Wrong email or password';
const AUTH_MESSAGE = 'Authorization required';
const FORBIDDEN_MESSAGE = 'Access to the requested resource is denied';
const NOT_FOUND_PAGE = 'This page does not exist';

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  OK,
  CREATED,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  CAST_ERROR_MESSAGE,
  ALREADY_EXISTS_MESSAGE,
  NO_ACCESS_MESSAGE,
  AUTH_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_PAGE,
};
