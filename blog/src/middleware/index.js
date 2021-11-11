// Get individual blog
let { blogs } = require('../services')

const getBlogById = (req, res, next) => {
    const { params: { id }} = req
    
    const index = blogs.findIndex(item => item.id === Number(id))
  
    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Blog does not exist',
            data: []
        })
    } 

    req.index = index
    req.id = id
    next()
}


module.exports = { getBlogById }