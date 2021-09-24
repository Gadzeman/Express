const { userNormalizator } = require('../utils/users.normalizator');
const User = require('../db/Users');
const { hash } = require('../services/users.service');

module.exports = {
  getUser: (req, res, next) => {
    try {
      const { user } = req;
      res.json({
        user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await hash(password);
      const createdUser = await User.create({ ...req.body, password: hashedPassword });
      res.json(createdUser);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await User.deleteOne({_id: user_id});
      res
        .status(202)
        .json(`${ req.user.name } is deleted`);
    } catch (e) {
      next(e);
    }
  }
};
