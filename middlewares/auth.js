const jwt = require('jsonwebtoken');
const MyError = require('../modules/error');

console.log(process.env.NODE_ENV);

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const handleAuthError = () => next(new MyError('Необходима авторизация', 401));

  const extractBearerToken = (header) => header.replace('Bearer ', '');
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev');
  } catch (err) {
    return next(new MyError('Необходима авторизация', 401));
  }
  req.user = payload;

  return next();
};
