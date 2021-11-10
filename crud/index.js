const express = require('express')

const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

let colour = []

// CRUD
// C - Create   R - Read    U - Update  D - Delete
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to CRUD!',
        data: []
    })
})

// add individual color endpoint
app.post('/addcolor', (req, res) => {
    // const { body: { colour } } = req
    const response = req.body.colour
    colour.push(response)
    
    res.status(201).json({
        status: 'success',
        message: `Added color ${response}`,
        data: colour
    })
})

// get all colors endpoint
app.get('/colors', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to CRUD!',
        data: colour
    })
})

const getColorByIndex = (req, res, next) => {
    const { params: { id }} = req

    const color = colour[id]
    
    if (!color) {
        return res.status(404).json({
            status: 'success',
            message: 'Color not available',
            data: []
        })
    } 

    req.color = color
    req.id = id
    return next()
}

// get individual color endpoint
app.get('/color/:id', getColorByIndex, (req, res) => {
    const color = req.color

    res.status(200).json({
        status: 'success',
        message: 'Found the color',
        data: color
    })

})

// update color
app.put('/color/:id', getColorByIndex, (req, res) => {
    const updatedColor = req.body.colour
    const formerColor = req.color
    const id = req.id
    colour[id] = updatedColor

    res.status(200).json({
        status: 'success',
        message: `Updated the color from ${formerColor} to ${updatedColor}`,
        data: colour
    })
})

// delete color
app.delete('/color/:id', getColorByIndex, (req, res) => {
    const id = req.id
    colour.splice(id, 1)

    res.status(200).json({
        status: 'success',
        message: `Deleted the color at index ${id}`,
        data: colour
    })
})

// Error handling middleware
app.use((req, res) => {
    res.send('Not Found')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.send(err.message)
})

app.listen(port, () => console.log(`Server is running on port ${port}`))