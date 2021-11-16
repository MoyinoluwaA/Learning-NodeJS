const { createUser, validatePassword, updatePassword } = require('../services')

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

const forgotPassword = async(req, res, next) => {
    try {
        const { token } = req
        res.status(200).json({
            status: 'success',
            message: 'token generated to reset password',
            data: { token }
        })
    }
    catch (err) {
        next(err)
    }
}

const resetPassword = async(req, res, next) => {
    try {
        const { body, id } = req
        const user = await updatePassword(body.password, id)
        const { password, ...updatedUser } = user

        res.status(200).json({
            status: 'success',
            message: 'password reset successfully',
            data: updatedUser
        })
    }
    catch (err) {
        next(err)
    }
}

const userController = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}

module.exports = userController