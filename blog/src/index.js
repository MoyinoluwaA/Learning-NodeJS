const express = require('express')
const router = require('./routes')

const app = express()
const port = 4000

// Middlewares
app.use(express.json()) // converts request body to json format
app.use(express.urlencoded({
    extended: true
}))

// Default response on root route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to my Blog API',
        data: []
    })
})

app.use(router)


// Error handling middleware
app.use((req, res) => {
    res.send('Not Found')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        status: 'failed',
        message: 'internal server error',
        data: []
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))