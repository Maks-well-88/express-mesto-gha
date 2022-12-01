const router = require('express').Router();
const {
  deleteCard,
  getCards,
  createCard,
  likeCard,
  dislikeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeLike);

module.exports = router;