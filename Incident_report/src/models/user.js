const Joi = require('joi')

const createUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    message: 'Error creating new user'
}

const loginUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    message: 'Error logging in user'
}

const forgotPasswordSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required()
    }),
    message: 'User not found'
}

const resetPasswordSchema = {
    schema: Joi.object().keys({
        password: Joi.string().required()
    }),
    message: 'User not found'
}

module.exports = {
    createUserSchema,
    loginUserSchema,
    forgotPasswordSchema,
    resetPasswordSchema
}