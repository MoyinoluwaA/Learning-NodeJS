const { getUser, fetchWeather } = require("../services")
const { validateToken, generateToken } = require("../utils")

const checkUserExists = (type) => async(req, res, next) => {
    try {
        const { body } = req
        const { email } = body
        const [ user ] = await getUser(email)

        if (type === 'register') {
            if (user) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'User already exists. Log in',
                    data: []
                })
            }
    
            next()
        } else {
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
        next(err)
    }
}

const verifyToken = (type) => async(req, res, next) => {
    try {
        let token;
        type === 'access' 
        ? 
            token = req.headers['x-access-token']
        :
            token = req.query.token
    
        if (!token)
            return res.status(403).json({
                status: 'fail',
                message: 'No token provided.'
            })
        
        const tokenValidated = await validateToken(token, type)
        
        if (!tokenValidated) 
            return res.status(403).json({
                status: 'fail',
                message: 'Failed to authenticate token.'
            })
        
        const { email, user_id } = tokenValidated
        const [authorizedUser] = await getUser(email)

        if (!authorizedUser) 
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid credentials'
            })
        
        req.id = user_id
        next()
    }
    catch (err) {
        next(err)
    }
}

const getWeatherReport = async(req, res, next) => {
    try {
        const { body, id } = req        
        const { city, country } = body

        const weather = await fetchWeather(city, country)
    
        if (!weather) 
            return res.status(404).json({
                status: 'failed',
                message: 'Could not fetch weather for city and country'
            })
        
        req.weather = weather.data
        req.user_id = id
        next()
    }
    catch (err) {
        next(err)
    }
}


const generateResetPasswordToken = async(req, res, next) => {
    try {
        const { body: { email } } = req
        const [ user ] = await getUser(email)
    
        if (!user) 
            res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })

        const token = await generateToken(user, 'reset')
        req.token = token
        next()
        
    } catch (err) {
        next(err)
    }
}


module.exports = { 
    checkUserExists,
    verifyToken,
    getWeatherReport,
    generateResetPasswordToken
}