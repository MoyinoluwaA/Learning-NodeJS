const express = require('express')
const router = express.Router()
const { validateBlogById } = require('../middleware')
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require('../controller')

router.post('/api/blog', createBlog)
router.get('/api/blogs', getBlogs)
router.get('/api/blog/:id', validateBlogById, getBlog)
router.put('/api/blog/:id', validateBlogById, updateBlog)
router.delete('/api/blog/:id', validateBlogById, deleteBlog)

module.exports = router