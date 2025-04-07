const Joi = require("joi");
const mongoose = require("mongoose");

const superAdminCreationValidation = Joi.object({
  name: Joi.string().min(2).max(100).required(),

  email: Joi.string().email().required(),
  mobile: Joi.string().pattern(/^[0-9]{10,15}$/).messages({
    'string.pattern.base': `Mobile number must be digits (10–15 digits)`
  }),

});

module.exports = superAdminCreationValidation;
