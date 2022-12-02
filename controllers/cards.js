/* eslint-disable no-console */
const cardModel = require('../models/card');
const constants = require('../utils/constants');

const getCards = async (req, res) => {
  try {
    const cards = await cardModel.find({}).populate(['owner', 'likes']);
    return res.status(constants.OK).send(cards);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await cardModel
      .create(
        {
          name: req.body.name,
          link: req.body.link,
          owner: req.user._id,
        },
      );
    const cardWithOwner = await card.populate('owner');
    return res.status(constants.CREATED).send(cardWithOwner);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(constants.BAD_REQUEST).send({ message: error.message });
    }
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await cardModel.findByIdAndDelete(req.params.cardId);
    if (card === null) {
      return res.status(constants.NOT_FOUND).send({ message: constants.NOT_FOUND_MESSAGE });
    }
    return res.status(constants.OK).send(await card.populate('owner'));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(constants.BAD_REQUEST).send({ message: constants.CAST_ERROR_MESSAGE });
    }
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const likeCard = async (req, res) => {
  try {
    const likedCard = await cardModel
      .findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
    if (likedCard === null) {
      return res.status(constants.NOT_FOUND).send({ message: constants.NOT_FOUND_MESSAGE });
    }
    return res.status(constants.OK).send(await likedCard.populate('likes'));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(constants.BAD_REQUEST).send({ message: constants.CAST_ERROR_MESSAGE });
    }
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

const dislikeLike = async (req, res) => {
  try {
    const dislikedCard = await cardModel
      .findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
    if (dislikedCard === null) {
      return res.status(constants.NOT_FOUND).send({ message: constants.NOT_FOUND_MESSAGE });
    }
    return res.status(constants.OK).send(await dislikedCard.populate('likes'));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(constants.BAD_REQUEST).send({ message: constants.CAST_ERROR_MESSAGE });
    }
    return res.status(constants.SERVER_ERROR).send({ message: constants.SERVER_ERROR_MESSAGE });
  }
};

module.exports = {
  deleteCard,
  getCards,
  createCard,
  likeCard,
  dislikeLike,
};

// [DELETE] Удаление карточки с несуществующим в БД id
