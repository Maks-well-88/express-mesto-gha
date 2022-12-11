const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const constants = require('../utils/constants');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(constants.OK).send(users);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return res.status(constants.NOT_FOUND).send({ message: constants.NOT_FOUND_MESSAGE });
    }
    return res.status(constants.OK).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(constants.BAD_REQUEST).send({ message: constants.CAST_ERROR_MESSAGE });
    }
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    });
    return res.status(constants.CREATED).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(constants.BAD_REQUEST).send({ message: error.message });
    }
    if (error.name === 'MongoServerError') {
      return res.status(constants.BAD_REQUEST).send({ message: constants.ALREADY_EXISTS_MESSAGE });
    }
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(constants.UNAUTHORIZED).send({ message: constants.NO_ACCESS_MESSAGE });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(constants.UNAUTHORIZED).send({ message: constants.NO_ACCESS_MESSAGE });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return res.send({ token });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return res.status(constants.NOT_FOUND).send({ message: constants.NOT_FOUND_MESSAGE });
    }
    return res.status(constants.OK).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(constants.BAD_REQUEST).send({ message: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(constants.BAD_REQUEST).send({ message: constants.CAST_ERROR_MESSAGE });
    }
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return res.status(constants.NOT_FOUND).send({ message: constants.NOT_FOUND_MESSAGE });
    }
    return res.status(constants.OK).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(constants.BAD_REQUEST).send({ message: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(constants.BAD_REQUEST).send({ message: constants.CAST_ERROR_MESSAGE });
    }
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
