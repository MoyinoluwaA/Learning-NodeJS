const { getUser } = require("../services/user");
const { validateToken } = require("../utils");

const verifyToken = (type, role) => async(req, res, next) => {
    try {
        let token;
        type === 'access' 
        ? 
            token = req.headers['x-access-token']
        :
            token = req.query.token
    
        if (!token)
            return res.status(403).json({
                status: 'failed',
                message: 'No token provided.'
            })
        
        const tokenValidated = await validateToken(token, type)

        if (role='all' && !tokenValidated) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized'
            })
            
        } else if ((role= 'admin' || 'customer') && !tokenValidated || tokenValidated.role !== role) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized'
            })
        }
        
        const { email, id } = tokenValidated
        const [authorizedUser] = await getUser(email)

        if (!authorizedUser) 
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid credentials'
            })
        
        req.id = id
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = verifyToken