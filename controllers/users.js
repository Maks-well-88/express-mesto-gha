/* eslint-disable no-console */
const userModel = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send(users);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).send({ message: 'Oops! Something went wrong...' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'This user does not exist' });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'CastError') {
      return res
        .status(400)
        .send({ message: 'Error! Incorrect request to the server' });
    }
    return res.status(500).send({ message: 'Oops! Something went wrong...' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: 'Oops! Something went wrong...' });
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
    return res.status(200).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: 'Oops! Something went wrong...' });
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
    return res.status(200).send(user);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: 'Oops! Something went wrong...' });
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
};
