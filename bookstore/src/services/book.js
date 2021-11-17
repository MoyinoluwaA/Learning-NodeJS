const db = require('../db')
const queries = require('../db/queries')

const createBook = (body, id) => {
    const { title, author } = body
    return db.one(queries.addBook, [title, author, id])
}

const updateBook = (body, id, bookId) => {
    const { title, author } = body
    return db.one(queries.updateBook, [title, author, id, bookId])
}

const getBook = async id => {
    try {
        const book = await db.one(queries.getBook, [id])
        return book
    }
    catch (err) {
        return false
    }
}

const fetchBooks = () => db.many(queries.getBooks)

const addUserBook = (userId, bookId) => {
    return db.one(queries.addUserBook, [userId, bookId])
}

const getUserBook = async(id, bookId) => {
    try {
        const book = await db.one(queries.getUserBookById, [id, bookId])
        return book
    }
    catch (err) {
        return false
    }
}

const fetchUserBooks = id => db.many(queries.getUserBooks, [id])

const deleteUserBook = (id, bookId) => db.one(queries.deleteUserBookById, [id, bookId])

module.exports = {
    createBook,
    getBook,
    updateBook,
    fetchBooks,
    addUserBook,
    getUserBook,
    fetchUserBooks,
    deleteUserBook
}