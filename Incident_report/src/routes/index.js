const express = require('express')
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controller/user')
const { createIncidentReport, fetchAllIncidents, fetchUserIncidents } = require('../controller/report')
const { checkUserExists, verifyToken, getWeatherReport, generateResetPasswordToken } = require('../middleware')
const { createUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema } = require('../models/user')
const { createIncidentSchema } = require('../models/incidents')
const validateData = require('../middleware/validation')

const router = express.Router()

router.post(
    '/api/users/register', 
    validateData(createUserSchema, 'body'),
    checkUserExists('register'), 
    registerUser
)

router.post(
    '/api/users/login',
    validateData(loginUserSchema, 'body'),
    checkUserExists('login'), 
    loginUser
)

router.post(
    '/api/users/forgot-password',
    validateData(forgotPasswordSchema, 'body'),
    generateResetPasswordToken,
    forgotPassword
)

router.post(
    '/api/users/reset-password',
    verifyToken('reset'),
    validateData(resetPasswordSchema, 'body'),
    resetPassword
)

router.post(
    '/api/user-incident_report', 
    verifyToken('access'), 
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
    verifyToken('access'), 
    fetchUserIncidents
)


module.exports = router