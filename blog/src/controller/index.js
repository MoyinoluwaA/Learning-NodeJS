let { blogs, id } = require('../services')

// Adding date
const nowDate = new Date()
const date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate()

// Creating a blog
const createBlog = async(req, res, next) => {
    try {
        const { body } = req
        const blog = {id, ...body, created_at: date}
        blogs.push(blog)
        id++

        res.status(201).json({
            status: 'success',
            message: 'Added new blog',
            data: blog
        })
    
    } catch (error) {
        return next(error)
    }
}

const getBlogs = async(req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Fetched all blogs',
            data: blogs
        })

    } catch (error) {
        return next(error)
    }
}

const getBlog = async(req, res, next) => {
    try {
        const { index, id } = req

        res.status(200).json({
            status: 'success',
            message: `Found the blog with id ${id}`,
            data: blogs[index]
        })

    } catch (error) {
        return next(error)
    }
}

const updateBlog = async(req, res, next) => {
    try {
        const { body } = req
        const { index, id } = req
        const updatedBlog = { id: Number(id), ...body, updated_at: date }
        blogs[index] = updatedBlog

        res.status(200).json({
            status: 'success',
            message: `Updated the blog with id ${id}`,
            data: updatedBlog
        })

    } catch (error) {
        return next(error)
    }
}

const deleteBlog = async(req, res, next) => {
    try {
        const { index, id } = req
        blogs.splice(index, 1)

        res.status(200).json({
            status: 'success',
            message: `Deleted the blog at index ${id}`,
            data: []
        })

    } catch (error) {
        return next(error)
    }
}


module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
}