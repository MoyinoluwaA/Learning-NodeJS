const { createUser, validatePassword } = require('../services')

const registerUser = async(req, res) => {
    try {
        const { body } = req
        const newUser  = await createUser(body)

        res.status(201).json({
            status: 'success',
            message: 'User added successfully',
            data: newUser
        })
    }
    catch (err) {
        console.log(err)
    }
}

const loginUser = async(req, res) => {
    try {
        const { user, password } = req
       
        const validated = await validatePassword(user, password)

        res.status(201).json({
            status: 'success',
            message: 'User logged in successfully',
            data: validated
        })
    }
    catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err.message
        })
    }
}

const userController = {
    registerUser,
    loginUser
}

module.exports = userController