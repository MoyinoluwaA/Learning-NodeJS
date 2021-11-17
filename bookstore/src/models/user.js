const Joi = require('joi')

const createUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().valid('admin', 'customer').required()
    }),
    message: 'Error creating new user'
}

const loginUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    message: 'Error logging in user'
}

module.exports = {
    createUserSchema,
    loginUserSchema
}