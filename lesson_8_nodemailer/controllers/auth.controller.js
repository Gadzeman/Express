const OAuth = require('../db/OAuth');
const { AUTHORIZATION } = require('../config/variables');
const { compare } = require('../services/password.service');
const { generateTokenPair } = require('../services/auth.service');
const { userNormalizator } = require('../utils/users.normalizator');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;
      await compare(user.password, password);
      const tokenPair = generateTokenPair();
      await OAuth.create({ ...tokenPair, user: user._id });
      res.json({
        ...tokenPair,
        user: userNormalizator(req.user)
      });
    } catch (e) {
      next(e);
    }
  },
  logoutUser: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);
      await OAuth.deleteOne({ access_token });
      res.json('User left');
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const { user } = req;
      const refresh_token = req.get(AUTHORIZATION);
      await OAuth.deleteOne({ refresh_token });
      const tokenPair = generateTokenPair();
      await OAuth.create({ ...tokenPair, user: user._id });
      res.json({
        ...tokenPair,
        user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  }
};
