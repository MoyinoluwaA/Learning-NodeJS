const jwt = require('jsonwebtoken')
const { getUser, validateRegisterInput, validateLoginInput, fetchWeather, validateReportInput } = require("../services")

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

const verifyToken = async(req, res, next) => {
    try {
        var token = req.headers['x-access-token']
    
        if (!token)
            throw new Error('No token provided.')
        
        const isAuthorized = await jwt.verify(token, process.env.TOKEN_KEY)
    
        if (!isAuthorized) 
            throw new Error('Failed to authenticate token.')
        
        req.authorizedUser = isAuthorized
        next()
    }
    catch (err) {
        return res.status(403).json({
            status: 'fail',
            message: err.message
        })
    }
}

const getWeatherReport = async(req, res, next) => {
    try {
        const { body, authorizedUser } = req
        
        if (authorizedUser) {
            const validated = await validateReportInput(body)
            
            if (validated) {
                const { city, country } = body
                const weather = await fetchWeather(city, country)
                
                const { user_id } = authorizedUser
                req.weather = weather.data
                req.user_id = user_id
                next()
            }
        }
        
    }
    catch (err) {
        return res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}


module.exports = { 
    checkUserExistsRegister,
    checkUserExistsLogin,
    verifyToken,
    getWeatherReport
}