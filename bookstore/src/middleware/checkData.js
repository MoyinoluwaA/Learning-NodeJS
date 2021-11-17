const { getBook, getUserBook } = require("../services/book")
const { getUser } = require("../services/user")

const checkDataExists = (data, type) => async(req, res, next) => {
    try {
        const { body } = req
        
        if (data === 'user') {
            const { email } = body
            const [ user ] = await getUser(email)

            if (type === 'register') {
                if (user) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'User already exists. Log in',
                        data: []
                    })
                }
        
                next()
    
            } else {
                if (!user) {
                    return res.status(401).json({
                        status: 'failed',
                        message: 'Invalid credentials',
                        data: []
                    })
                }
        
                req.user = user
                req.password = body.password
                next()
            }
        } else {
            let book

            if (type === 'update') {
                const { query: { id }} = req
                book = await getBook(id)

                if (!book) {
                    return res.status(400).json({
                        'status': 'failed',
                        'message': 'Book does not exist'
                    })
                }

                req.bookId = id

            } else if (type === 'add') {

                const { body: { book_id }, id} = req
                book = await getBook(book_id)
                
                if (!book) {
                    return res.status(400).json({
                        'status': 'failed',
                        'message': 'Book does not exist'
                    })
                }

                const isInCatalogue = await getUserBook(id, book_id)

                if (isInCatalogue) 
                    return res.status(400).json({
                        'status': 'failed',
                        'message': 'Book already exists in catalogue'
                    })


                req.bookId = book_id

            } else {
                const { query: { book_id }, id} = req
                const isInCatalogue = await getUserBook(id, book_id)

                if (!isInCatalogue) 
                    return res.status(400).json({
                        'status': 'failed',
                        'message': 'Book is not in user catalogue'
                    })
                
                req.bookId = book_id
            }
            
            req.book = book
            next()
        }
       
    }
    catch (err) {
        next(err)
    }
}

module.exports = checkDataExists