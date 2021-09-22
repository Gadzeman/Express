const ErrorHandler = require('../errors/error.handler');
const OAuth = require('../db/OAuth');
const { AUTHORIZATION } = require('../config/variables');
const { verifyToken } = require('../services/jwt.service');

module.exports = {
  validateTokenAccess: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
      if (!token) {
        throw new ErrorHandler(401, 'No token');
      }
      await verifyToken(token);
      const tokenFromDB = await OAuth.findOne({ access_token: token }).populate('user');
      if (!tokenFromDB) {
        throw new ErrorHandler(401, 'This token is not from my db');
      }
      next();
    } catch (e) {
      next(e);
    }
  },
  validateTokenRefresh: async (req, res, next) => {
    try {
      const refresh_token = req.get(AUTHORIZATION);
      if (!refresh_token) {
        throw new ErrorHandler(401, 'No token');
      }
      await verifyToken(refresh_token, 'refresh');
      const tokenFromDB = await OAuth.findOne({ refresh_token }).populate('user');
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
