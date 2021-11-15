const Joi = require('joi');

const validatePostBody = Joi.object({
  title: Joi.string().required().min(2).max(12),
  description: Joi.string().required().min(4).max(32),
  user: Joi.string().required().trim()
});

module.exports = validatePostBody;
