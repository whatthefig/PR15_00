const Card = require('../models/card');
const MyError = require('../modules/error');

module.exports.createCard = (req, res, next) => {
  const {
    name, link, likes,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new MyError('Объект не найден', 402);
      }
      if (card.owner !== req.user._id) {
        next(new MyError('Недостаточно прав', 403));
      } else {
        Card.findByIdAndDelete(id)
          .then((deletedcard) => res.send({ deletedcard }))
          .catch(next);
      }
    })
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};
