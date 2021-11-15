const Joi = require('joi');

const validateUserBody = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = validateUserBody;
