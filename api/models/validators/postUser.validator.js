const Joi = require('@hapi/joi');

const schemas = Joi.object({
    user_id: Joi.string().alphanum().min(24).max(24).required(),
    authorization_code: Joi.string().required()
});

module.exports = schemas;
