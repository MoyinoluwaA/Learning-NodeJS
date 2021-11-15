const { getUser, fetchWeather } = require("../services")
const { validateToken } = require("../utils")

const checkUserExistsRegister = async(req, res, next) => {
    try {
        const { body: { email } } = req
        const [ user ] = await getUser(email)
        
        if (user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User already exists. Log in',
                data: []
            })
        }

        next()
    } 
    catch (err) {
        next(err)
    }
}

const checkUserExistsLogin = async(req, res, next) => {
    try {
        const { body } = req
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
    catch (err) {
        next(err)
    }
}

const verifyToken = async(req, res, next) => {
    try {
        var token = req.headers['x-access-token']
    
        if (!token)
            return res.status(403).json({
                status: 'fail',
                message: 'No token provided.'
            })
        
        const tokenValidated = await validateToken(token)
    
        if (!tokenValidated) 
            return res.status(403).json({
                status: 'fail',
                message: 'Failed to authenticate token.'
            })
        
        const { email, user_id } = tokenValidated
        const isAuthorized = await getUser(email)

        if (!isAuthorized) 
            return res.status(403).json({
                status: 'fail',
                message: 'Failed to authenticate token.'
            })
        
        req.authorizedUser = user_id
        next()
    }
    catch (err) {
        next(err)
    }
}

const getWeatherReport = async(req, res, next) => {
    try {
        const { body, authorizedUser } = req        
        const { city, country } = body

        const weather = await fetchWeather(city, country)
    
        if (!weather) 
            return res.status(404).json({
                status: 'failed',
                message: 'Could not fetch weather for city and country'
            })
        
        const { user_id } = authorizedUser
        req.weather = weather.data
        req.user_id = user_id
        next()
    }
    catch (err) {
        next(err)
    }
}


module.exports = { 
    checkUserExistsRegister,
    checkUserExistsLogin,
    verifyToken,
    getWeatherReport
}