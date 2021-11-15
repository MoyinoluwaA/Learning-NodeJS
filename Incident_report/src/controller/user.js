const { createUser, validatePassword } = require('../services')

const registerUser = async(req, res) => {
    try {
        const { body } = req
        const newUser  = await createUser(body)
        const { password, ...user } = newUser

        res.status(201).json({
            status: 'success',
            message: 'User added successfully',
            data: user
        })
    }
    catch (err) {
        next(err)
    }
}

const loginUser = async(req, res) => {
    try {
        const { user, password } = req
       
        const validated = await validatePassword(user, password)

        if (!validated) {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: 'Error logging in user'
            })
        } else {
            res.status(201).json({
                status: 'success',
                message: 'User logged in successfully',
                data: validated
            })
        }
    }
    catch (err) {
        next(err)
    }
}

const userController = {
    registerUser,
    loginUser
}

module.exports = userController