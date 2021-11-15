const express = require('express')
const { registerUser, loginUser } = require('../controller/user')
const { createIncidentReport, fetchAllIncidents, fetchUserIncidents } = require('../controller/report')
const { checkUserExistsRegister, checkUserExistsLogin, verifyToken, getWeatherReport } = require('../middleware')
const { createUserSchema, loginUserSchema } = require('../models/user')
const { createIncidentSchema } = require('../models/incidents')
const validateData = require('../middleware/validation')

const router = express.Router()

router.post(
    '/api/users/register', 
    validateData(createUserSchema, 'body'),
    checkUserExistsRegister, 
    registerUser
)

router.post(
    '/api/users/login',
    validateData(loginUserSchema, 'body'),
    checkUserExistsLogin, 
    loginUser
)

router.post(
    '/api/user-incident_report', 
    verifyToken, 
    validateData(createIncidentSchema, 'body'),
    getWeatherReport, 
    createIncidentReport
)

router.get(
    '/api/incident_reports', 
    fetchAllIncidents
)

router.get(
    '/api/user-incident_report', 
    verifyToken, 
    fetchUserIncidents
)


module.exports = router