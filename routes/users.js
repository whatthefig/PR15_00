const userRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  getUsers, findUser,
} = require('../controllers/users');

userRout.get('/users', getUsers);
userRout.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), findUser);

module.exports = userRout;
