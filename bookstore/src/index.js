const express = require('express')
const db = require('./db')
const router = require('./routes')

const port = 4000
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Welcome to bookstore API'
    })
})

app.use('/api', router)

app.use((req, res) => {
    res.status(404).json({
        status: 'failed',
        message: 'Not Found',
        data: 'Route does not exist'
    })
})

app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'failed',
        message: 'Internal Server Error'
    })
})


db.connect()
.then((obj) => {
    app.listen(port, () => {
        obj.done()
        console.log(`Server is running on port ${port}`)
    })
})
.catch((err) => {
    console.log(err)
})


module.exports = app