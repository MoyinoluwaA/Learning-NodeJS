const Joi = require('joi')

const createIncidentSchema = {
    schema: Joi.object().keys({
        incident_description: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required()
    }),
    message: 'Error creating incident report'
}

module.exports = {
    createIncidentSchema
}