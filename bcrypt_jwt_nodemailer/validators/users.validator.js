const Joi = require('joi');

const usersRoles = require('../config/users.roles');

module.exports = {
  validateUserBody: Joi.object({
    name: Joi.string().required().min(2).max(10),
    password: Joi.string().required().min(3).max(10),
    role: Joi.string().valid( ...Object.values(usersRoles) ).default( usersRoles.USER )
  })
};
