const db = require('../db')
const queries = require('../db/queries')


const addBlog = data => {
    const { name, author, domain } = data
    const payload = [name, author, domain]
    return db.any(queries.addNewBlog, payload)
}

const fetchAllBlogs = () => db.many(queries.getAllBlogs, [])

const fetchBlog = id => db.any(queries.getOneBlog, [id])

const updateBlogById = (data, id) => {
    const { name, author, domain } = data
    const payload = [name, author, domain, id]
    return db.any(queries.updateOneBlog, payload)
}

const deleteBlogById = id => db.none(queries.deleteOneBlog, [id])

module.exports = {
    addBlog, 
    fetchAllBlogs, 
    fetchBlog,
    updateBlogById,
    deleteBlogById
}