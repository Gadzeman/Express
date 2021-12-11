const { usersModel } = require('../models');
const { nodemailerService } = require('../services');
const { normalizeUser } = require('../utils/users.normalizator');

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const { users } = req;

      // await nodemailerService.sendMain('ostap778800@gmail.com');

      res.json( users );
    } catch (e) {
      next(e);
    }
  },
  postUser: async (req, res, next) => {
    try {
      const newUser = await usersModel.create(req.body);

      res.json({
        createdUser: normalizeUser(newUser, 'password')
      });
    } catch (e) {
      next(e);
    }
  }
};
