const cardModel = require('../models/card');
const constants = require('../utils/constants');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');

const getCards = async (req, res, next) => {
  try {
    const cards = await cardModel.find({}).populate(['owner', 'likes']);
    return res.status(constants.OK).send(cards);
  } catch (error) {
    return next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const card = await cardModel
      .create({ name: req.body.name, link: req.body.link, owner: req.user._id });
    const cardWithOwner = await card.populate('owner');
    return res.status(constants.CREATED).send(cardWithOwner);
  } catch (error) {
    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await cardModel.findById(req.params.cardId);
    if (card.owner._id.toString() !== req.user._id) {
      return next(new ForbiddenError(constants.FORBIDDEN_MESSAGE));
    }
    if (card === null) {
      return next(new NotFoundError(constants.NOT_FOUND_MESSAGE));
    }
    await cardModel.findByIdAndDelete(req.params.cardId);
    return res.status(constants.OK).send(await card.populate(['owner', 'likes']));
  } catch (error) {
    return next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const likedCard = await cardModel
      .findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
    if (likedCard === null) {
      return next(new NotFoundError(constants.NOT_FOUND_MESSAGE));
    }
    return res.status(constants.OK).send(await likedCard.populate(['owner', 'likes']));
  } catch (error) {
    return next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const dislikedCard = await cardModel
      .findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
    if (dislikedCard === null) {
      return next(new NotFoundError(constants.NOT_FOUND_MESSAGE));
    }
    return res.status(constants.OK).send(await dislikedCard.populate(['owner', 'likes']));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  deleteCard,
  getCards,
  createCard,
  likeCard,
  dislikeCard,
};
