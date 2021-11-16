const db = require('../db')
const queries = require('../db/queries')
const nodemailer = require('nodemailer')
const axios = require('axios').default
const { hashPassword, comparePassword, generateToken } = require('../utils')

const createUser = async body => {
    const { first_name, last_name, username, email, password } = body
    const encryptedPassword = await hashPassword(password)

    const payload = [ first_name, last_name, username, email, encryptedPassword ]
    return db.one(queries.addUser, payload)
}

const validatePassword = async(user, password) => {
    const isValid = await comparePassword(password, user.password)

    if (isValid) {
        const token = await generateToken(user, 'access')
        return { token }
    }
    return false
}

const getUser = email => db.any(queries.getUser, email)

const fetchWeather = async(city, country) => {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ city },${ country }&appid=${ process.env.WEATHER_API_KEY }`)

    if (weather)
        return weather

    return false
}

const createReport = (req) => {
    const { body, user_id, weather } = req
    const { incident_description, city, country } = body

    const payload = [ user_id, incident_description, city, country, weather ]
    return db.one(queries.addIncidentReport, payload)
}

const getAllIncidents = () => db.any(queries.getIncidents)

const getUserIncident = id => db.any(queries.getUserIncidents, id)

const sendEmail = async(req) => {
    try {

        const { token, body } = req
        let testAccount = await nodemailer.createTestAccount();
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        })
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "bar@example.com, baz@example.com",
            subject: "Reset password",
            html: `Here is the link to reset your password: <u>${token}</u>`, 
        })
    
        console.log("Message sent: %s", info.messageId);
        
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    }
    catch(err) {
        console.log(err)
    }
}

const updatePassword = async(password, id) => {
    const encryptedPassword = await hashPassword(password)
    return db.one(queries.updatePassword, [encryptedPassword, id])
}

module.exports = {
    createUser,
    validatePassword,
    getUser,
    fetchWeather,
    createReport,
    getAllIncidents,
    getUserIncident,
    updatePassword
}