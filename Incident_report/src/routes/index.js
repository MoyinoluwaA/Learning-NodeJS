const express = require('express')
const { registerUser, loginUser } = require('../controller/user')
const { checkUserExistsRegister, checkUserExistsLogin } = require('../middleware')

const router = express.Router()

router.post('/api/users/register', checkUserExistsRegister, registerUser)
router.post('/api/users/login', checkUserExistsLogin, loginUser)


module.exports = router