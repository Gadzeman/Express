const ErrorHandler = require('../errors/error.handler');
const { bcryptService, jwtService } = require('../services');
const { AUTHORIZATION } = require('../config/variables');
const { USER } = require('../config/db.collections.enum');
const { authModel } = require('../models');

module.exports = {
  ifPasswordNotValid: async (req, res, next) => {
    try {
      const { body, user } = req;

      const validPassword = await bcryptService.compare(body.password, user.password);

      if ( !validPassword ) {
        throw new ErrorHandler(400, 'Password not valid');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  generateTokenPair: async (req, res, next) => {
    try {
      req.tokenPair = await jwtService.generateTokenPair();

      next();
    } catch (e) {
      next(e);
    }
  },
  ifTokenNotExist: (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if ( !token ) {
        throw new ErrorHandler(401, 'Token not exist');
      }

      req.token = token;

      next();
    } catch (e) {
      next(e);
    }
  },
  verifyToken: (tokenType = 'access') => async (req, res, next) => {
    try {
      const { token } = req;

      await jwtService.verifyToken(token, tokenType);

      next();
    } catch (e) {
      next(e);
    }
  },
  ifTokenNotFromDB: (tokenType = 'access') => async (req, res, next) => {
    try {
      const { token } = req;

      const tokenFromDB = await authModel.findOne( tokenType === 'access' ? { access_token: token } : { refresh_token: token } )
        .populate( USER );

      if ( !tokenFromDB ) {
        throw new ErrorHandler(403, 'Token not from DB');
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
