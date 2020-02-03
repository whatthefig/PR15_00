const cardsRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');

Joi.objectId = require('joi-objectid')(Joi);

const {
  createCard, getCards, deleteCard,
} = require('../controllers/cards');

cardsRout.post('/cards', celebrate({
  body: Joi.object().keys({
    link: Joi.string().uri(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createCard);

cardsRout.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), deleteCard);

cardsRout.get('/cards', getCards);

module.exports = cardsRout;
