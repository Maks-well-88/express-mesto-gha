const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(constants.UNAUTHORIZED).send({ message: constants.AUTH_MESSAGE });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(constants.UNAUTHORIZED).send({ message: constants.AUTH_MESSAGE });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
