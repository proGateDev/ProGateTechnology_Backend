const Joi = require('joi');

exports.contactUsValidation = Joi.object({
  name: Joi.string().required(),
  mobile: Joi.string().required(),
  mail: Joi.string().email().required(),
  message: Joi.string().required(),
  designation: Joi.string().optional().allow(''),
});
