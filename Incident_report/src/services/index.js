const db = require('../db')
const queries = require('../db/queries')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = async body => {
    const { first_name, last_name, username, email, password } = body

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10)

    const payload = [ first_name, last_name, username, email, encryptedPassword ]

    return db.one(queries.addUser, payload)
}

const validateRegisterInput = (body) => {
    const { first_name, last_name, username, email, password } = body
    
    if (!(first_name && last_name && username && email && password)) 
    throw new Error('Ensure all fields are required')

    return true
}

const validateLoginInput = (body) => {
    const { email, password } = body

    if (!(email && password)) 
    throw new Error('Ensure all fields are required')

    return true
}


const validatePassword = async(user, password) => {
    const isValid = await bcrypt.compare(password, user.password)

    if (isValid) {

        // Create token
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        )

        return { token }

    } else {
        throw new Error('Invalid Credentials')
    }
}

const getUser = email => db.any(queries.getUser, email)

module.exports = {
    createUser,
    validateRegisterInput,
    validateLoginInput,
    validatePassword,
    getUser
}