const validateUserBody = require('../validators/users.validator');
const User = require('../db/Users');
const ErrorHandler = require('../errors/error.handler');

module.exports = {
  getUserByDynamicParams: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const user = await User.findOne({ [dbField]: value });

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },
  ifUserPresent: async (req, res, next) => {
    try {
      const { email } = req.body;

      const emailExist = await User.findOne({ email });

      if (emailExist) {
        throw new ErrorHandler(400, 'User with this email already exist!');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  ifUserNotPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  validateUserBody: (req, res, next) => {
    try {
      const { error } = validateUserBody.validate(req.body);

      if (error) {
        throw new ErrorHandler(404, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkIsAdmin: (rolesArr = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      if (!rolesArr.length) {
        next();
      }

      if (!rolesArr.includes(role)) {
        throw new ErrorHandler(403, 'Forbidden');
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
