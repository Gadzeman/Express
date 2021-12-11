const { authModel } = require('../models');
const { normalizeUser } = require('../utils/users.normalizator');
const { jwtService } = require('../services');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { tokenPair, user } = req;

      await authModel.create({ ...tokenPair, user: user._id });

      res.json({
        ...tokenPair,
        user: normalizeUser(user, 'password')
      });
    } catch (e) {
      next(e);
    }
  },
  logoutUser: async (req, res, next) => {
    try {
      const { token } = req;

      await authModel.deleteOne({ access_token: token });

      res.json({
        message: 'User left'
      });
    } catch (e) {
      next(e);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { user, token } = req;

      const tokenPair = await jwtService.generateTokenPair();

      await authModel.deleteOne({ refresh_token: token });

      await authModel.create({ ...tokenPair, user: user._id });

      res.json({
        ...tokenPair,
        user: normalizeUser(user, 'password')
      });
    } catch (e) {
      next(e);
    }
  }
};
