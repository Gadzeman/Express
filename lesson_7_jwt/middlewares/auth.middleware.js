const ErrorHandler = require('../errors/error.handler');
const OAuth = require('../db/OAuth');
const { AUTHORIZATION } = require('../config/variables');
const { authService: { verifyToken } } = require('../services');

module.exports = {
  validateToken: (tokenToValidate = 'access') => async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(401, 'No token');
      }

      await verifyToken(token, tokenToValidate);

      const tokenFromDB = await OAuth.findOne(
        tokenToValidate === 'access'
          ?
          { access_token: token }
          :
          { refresh_token: token }
      ).populate('user');

      if (!tokenFromDB) {
        throw new ErrorHandler(401, 'This token is not from my db');
      }

      req.user = tokenFromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
