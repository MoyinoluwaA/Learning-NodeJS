const { blogs, id, addBlog, fetchAllBlogs, updateBlogById, deleteBlogById } = require('../services')

// Adding date
const nowDate = new Date()
const date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate()

// Creating a blog
const createBlog = async(req, res, next) => {
    try {
        const { body } = req
        const [ newBlog ] = await addBlog(body)

        res.status(201).json({
            status: 'success',
            message: 'Added new blog',
            data: newBlog
        })
    
    } catch (error) {
        return next(error)
    }
}

const getBlogs = async(req, res, next) => {
    try {
        const blogs = await fetchAllBlogs()

        res.status(200).json({
            status: 'success',
            message: 'Fetched all blogs',
            data: blogs
        })

    } catch (error) {
        return next(error)
    }
}

const getBlog = async(req, res) => {
    try {
        const { blog, id } = req

        res.status(200).json({
            status: 'success',
            message: `Found the blog with id ${id}`,
            data: blog
        })

    } catch (error) {
        return next(error)
    }
}

const updateBlog = async(req, res, next) => {
    try {
        const { body, id } = req
        const [ updatedBlog ] = await updateBlogById(body, id)
    
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
        const { id } = req
        const deletedBlog = await deleteBlogById(id)

        res.status(200).json({
            status: 'success',
            message: `Deleted the blog at index ${id}`,
            data: deletedBlog
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