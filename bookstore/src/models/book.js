const Joi = require('joi')


const addBookSchema = {
    schema: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required()
    }),
    message: 'Error adding book'
}

const updateBookSchema = {
    schema: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string()
    }),
    message: 'Error updating book'
}

const addUserBookSchema = {
    schema: Joi.object().keys({
        book_id: Joi.number().integer().required()
    }),
    message: 'Error adding book to catalogue'
}

module.exports = {
    addBookSchema,
    updateBookSchema,
    addUserBookSchema
}