const db = require('../db')
const queries = require('../db/queries')
const { hashPassword, comparePassword, generateToken } = require('../utils')

const createUser = async body => {
    const { first_name, last_name, email, password, role } = body
    const encryptedPassword = await hashPassword(password)

    const payload = [ first_name, last_name, email, encryptedPassword, role ]
    return db.one(queries.addUser, payload)
}

const getUser = email => db.any(queries.getUser, [email])

const validatePassword = async(user, password) => {
    const isValid = await comparePassword(password, user.password)

    if (isValid) {
        const token = await generateToken(user, 'access')
        return { token }
    }
    return false
}

module.exports = {
    createUser,
    getUser,
    validatePassword
}