const userModel = require('../models/user');
const constants = require('../utils/constants');

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
    const user = await userModel.create(req.body);
    return res.status(constants.CREATED).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(constants.BAD_REQUEST).send({ message: error.message });
    }
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
};
