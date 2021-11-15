const db = require('../db')
const queries = require('../db/queries')
const jwt = require('jsonwebtoken')
const axios = require('axios').default
const { hashPassword, comparePassword, generateToken } = require('../utils')

const createUser = async body => {
    const { first_name, last_name, username, email, password } = body
    const encryptedPassword = await hashPassword(password)

    const payload = [ first_name, last_name, username, email, encryptedPassword ]
    return db.one(queries.addUser, payload)
}

const validatePassword = async(user, password) => {
    const isValid = await comparePassword(password, user.password)

    if (isValid) {
        const token = await generateToken(user)
        return { token }
    }
    return false
}

const getUser = email => db.any(queries.getUser, email)

const fetchWeather = async(city, country) => {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ city },${ country }&appid=${ process.env.WEATHER_API_KEY }`)

    if (weather)
        return weather

    return false
}

const createReport = (req) => {
    const { body, user_id, weather } = req
    const { incident_description, city, country } = body

    const payload = [ user_id, incident_description, city, country, weather ]
    return db.one(queries.addIncidentReport, payload)
}

const getAllIncidents = () => db.any(queries.getIncidents)

const getUserIncident = id => db.any(queries.getUserIncidents, id)

module.exports = {
    createUser,
    validatePassword,
    getUser,
    fetchWeather,
    createReport,
    getAllIncidents,
    getUserIncident
}