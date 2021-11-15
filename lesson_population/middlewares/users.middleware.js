const ErrorHandler = require('../errors/error.handler');
const User = require('../db/User');
const { usersValidator } = require('../validators');

module.exports = {
  getUserByDynamicParams: (paramName, searchIn = 'body', dbField = paramName) =>
    async (req, res, next) =>
    {
      try {
        req.user = await User.findOne({ [dbField]: req[searchIn][paramName] });

        next();
      } catch (e) {
        next(e);
      }
    },
  ifUserPresent: (req, res, next) => {
    try {
      const { user } = req;

      if ( user ) {
        throw new ErrorHandler(400, 'User with this name already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  ifUserNotPresent: (req, res, next) => {
    try {
      const { user } = req;

      if ( !user ) {
        throw new ErrorHandler(404, 'User with this id not found');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  validateUserBody: (req, res, next) => {
    try {
      const { error } = usersValidator.validate(req.body);

      if ( error ) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
