const express = require('express')
const { registerUser, loginUser } = require('../controller/user')
const { createIncidentReport, fetchAllIncidents, fetchUserIncidents } = require('../controller/report')
const { checkUserExistsRegister, checkUserExistsLogin, verifyToken, getWeatherReport } = require('../middleware')

const router = express.Router()

router.post('/api/users/register', checkUserExistsRegister, registerUser)
router.post('/api/users/login', checkUserExistsLogin, loginUser)
router.post('/api/user-incident_report', verifyToken, getWeatherReport, createIncidentReport)
router.get('/api/incident_reports', fetchAllIncidents)
router.get('/api/user-incident_report', verifyToken, fetchUserIncidents)


module.exports = router