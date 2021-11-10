const express = require('express')

const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

let blogs = []
let id = 1

// Create blog endpoint
app.post('/api/blog', (req, res) => {
    const { body } = req
    const blog = {id, ...body}
    blogs.push(blog)
    id++

    res.status(201).json({
        status: 'success',
        message: 'Added new blog',
        data: blog
    })
})

// Get all blogs endpoint
app.get('/api/blogs', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Fetched all blogs',
        data: blogs
    })
})

const getBlogById = (req, res, next) => {
    const { params: { id }} = req
    
    const index = blogs.findIndex(item => item.id === Number(id))
  
    if (index === -1) {
        return res.status(404).json({
            status: 'failure',
            message: 'Blog does not exist',
            data: []
        })
    } 

    req.index = index
    req.id = id
    return next()
}

// get individual blog endpoint
app.get('/api/blog/:id', getBlogById, (req, res) => {
    const { index, id } = req

    res.status(200).json({
        status: 'success',
        message: `Found the blog with id ${id}`,
        data: blogs[index]
    })

})

// update blog
app.put('/api/blog/:id', getBlogById, (req, res) => {
    const { body } = req
    const { index, id } = req
    const updatedBlog = {id: Number(id), ...body}
    blogs[index] = updatedBlog

    res.status(200).json({
        status: 'success',
        message: `Updated the blog with id ${id}`,
        data: updatedBlog
    })
})

// delete blog
app.delete('/api/blog/:id', getBlogById, (req, res) => {
    const { index, id } = req
    blogs.splice(index, 1)

    res.status(200).json({
        status: 'success',
        message: `Deleted the blog at index ${id}`,
        data: blogs
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

app.listen(port, () => console.log(`Server listening on port ${port}`))