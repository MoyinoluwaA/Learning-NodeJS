const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require('../controller')

router.post('/api/blog', createBlog)
router.get('/api/blogs', getBlogs)
router.get('/api/blog/:id', middleware.checkBlogExists, getIndividualBlog)
router.put('/api/blog/:id', middleware.checkBlogExists, updateBlog)
router.delete('/api/blog/:id', middleware.checkBlogExists, deleteBlog)

module.exports = router