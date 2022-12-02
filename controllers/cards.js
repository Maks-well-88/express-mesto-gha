const cardModel = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await cardModel.find({});
    return res.status(200).send(cards);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).send({ message: 'Oops! Something went wrong...' });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await cardModel.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    return res.status(201).send(card);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: 'Oops! Something went wrong...' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await cardModel.findByIdAndDelete(req.params.cardId);
    if (card === null) {
      return res.status(404).send({ message: 'This card does not exist' });
    }
    return res.status(200).send(card);
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

const likeCard = async (req, res) => {
  try {
    const likedCard = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    if (likedCard === null) {
      return res.status(404).send({ message: 'This card does not exist' });
    }
    return res.status(200).send(likedCard);
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

const dislikeLike = async (req, res) => {
  try {
    const dislikedCard = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (dislikedCard === null) {
      return res.status(404).send({ message: 'This card does not exist' });
    }

    return res.status(200).send(dislikedCard);
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

module.exports = {
  deleteCard,
  getCards,
  createCard,
  likeCard,
  dislikeLike,
};
