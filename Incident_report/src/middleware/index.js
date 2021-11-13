const { getUser, validateRegisterInput, validateLoginInput } = require("../services")

const checkUserExistsRegister = async(req, res, next) => {
    try {
        const { body } = req
        const validated = validateRegisterInput(body)
    
        if (validated) {
            const { email } = body
            const [ user ] = await getUser(email)
           
            if (user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'User already exists. Log in',
                    data: []
                })
            }
    
            req.body = body
            next()
        }
    } 
    catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: err.message,
            data: []
        })
    }
}

const checkUserExistsLogin = async(req, res, next) => {
    try {
        const { body } = req
        const validated = validateLoginInput(body)
    
        if (validated) {
            const { email } = body
            const [ user ] = await getUser(email)
           
            if (!user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Invalid credentials',
                    data: []
                })
            }
    
            req.user = user
            req.password = body.password
            next()
        }
    } 
    catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: err.message,
            data: []
        })
    }
}

module.exports = { 
    checkUserExistsRegister,
    checkUserExistsLogin
}