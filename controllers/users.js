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
    const { userId } = req.params;
    const user = await userModel.findById(userId);
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
    const { name, about } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { name: name, about: about },
      {
        new: true,
        runValidators: true,
      }
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
    const { link } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { link: link },
      {
        new: true,
        runValidators: true,
      }
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
