const Joi = require('joi');
const { EMAIL_REGEX, PASSWORD_REGEX } = require('../config/regexes.enum');
const userRoles = require('../config/user.roles.enum');

const validateUserBody = Joi.object({
  name: Joi.string().min(2).max(28).required(),
  email: Joi.string().regex(EMAIL_REGEX).required(),
  password: Joi.string().regex(PASSWORD_REGEX).required(),
  role: Joi.string().allow( ...Object.values(userRoles) )
});

module.exports = validateUserBody;
