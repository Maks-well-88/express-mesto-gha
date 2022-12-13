const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const constants = require('../utils/constants');
require('dotenv').config();
const NotFoundError = require('../errors/notFoundError');
const NotAuthError = require('../errors/notFoundError');

const { JWT_SECRET } = process.env;

const getUsers = async (res, next) => {
  try {
    const users = await userModel.find({});
    return res.status(constants.OK).send(users);
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return next(new NotFoundError(constants.NOT_FOUND_MESSAGE));
    }
    return res.status(constants.OK).send(user);
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError(constants.NOT_FOUND_MESSAGE));
    }
    return res.status(constants.OK).send(user);
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await userModel
      .create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
      });
    const userWithoutPass = user.toObject();
    delete userWithoutPass.password;
    return res.status(constants.CREATED).send(userWithoutPass);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select('+password');
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new NotAuthError(constants.NO_ACCESS_MESSAGE));
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(constants.OK).send({ token });
  } catch (error) {
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError(constants.NOT_FOUND_MESSAGE));
    }
    return res.status(constants.OK).send(user);
  } catch (error) {
    return next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError(constants.NOT_FOUND_MESSAGE));
    }
    return res.status(constants.OK).send(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUser,
  getMe,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
