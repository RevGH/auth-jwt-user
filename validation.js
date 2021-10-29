// Validation
const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = data => {

    const schema = Joi.object({     // Sammarbetar med User model
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate()
};

// Login validation:
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation
};
