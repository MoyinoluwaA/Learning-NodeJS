let { fetchBlog } = require('../services')

const validateBlogById = async(req, res, next) => {
    const { params: { id }} = req
    
    const [ blog ] = await fetchBlog(id)
  
    if (!blog) {
        return res.status(404).json({
            status: 'fail',
            message: 'Blog does not exist',
            data: []
        })
    } 

    req.blog = blog
    req.id = id
    next()
}


module.exports = { validateBlogById }