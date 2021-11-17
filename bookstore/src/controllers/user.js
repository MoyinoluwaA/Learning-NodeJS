const { createUser, validatePassword } = require("../services/user")

const registerUser = async(req, res, next) => {
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

const loginUser = async(req, res, next) => {
    try {
        const { user, password } = req
       
        const { token } = await validatePassword(user, password)

        if (!token) {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: 'Error logging in user'
            })
        } else {
            res.status(201).json({
                status: 'success',
                message: 'User logged in successfully',
                data:  { role: user.role, token }
            })
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    registerUser,
    loginUser
}