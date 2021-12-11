const ErrorHandler = require('../errors/error.handler');

const { usersModel } = require('../models');
const { bcryptService } = require('../services');

module.exports = {
  getUsersWithoutParams: async (req, res, next) => {
    try {
      req.users = await usersModel.find({}, { name: 1, role: 1 });

      next();
    } catch (e) {
      next(e);
    }
  },
  getUserByDynamicParams: ( paramName, searchIn = 'body', dbField = paramName ) => async (req, res, next) => {
    try {
      req.user = await usersModel.findOne({ [dbField]: req[searchIn][paramName] });

      next();
    } catch (e) {
      next(e);
    }
  },
  ifUserExist: (req, res, next) => {
    try {
      const { user } = req;

      if ( user ) {
        throw new ErrorHandler(400, 'User already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  ifUserNotExist: (req, res, next) => {
    try {
      const { user } = req;

      if ( !user ) {
        throw new ErrorHandler(404, 'User not exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  validateUser: ( validator ) => (req, res, next) => {
    try {
      const { error } = validator.validate(req.body);

      if ( error ) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  hashUserPassword: async (req, res, next) => {
    try {
      const { body, body: { password } } = req;

      body.password = await bcryptService.hash( password );

      next();
    } catch (e) {
      next(e);
    }
  }
};
