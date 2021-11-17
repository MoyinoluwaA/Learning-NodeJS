const { createBook, updateBook, fetchBooks, addUserBook, fetchUserBooks, deleteUserBook } = require("../services/book")

const registerBook = async(req, res, next) => {
    try {
        const { body, id } = req
        const book  = await createBook(body, id)

        res.status(201).json({
            status: 'success',
            message: 'Book added successfully',
            data: book
        })
    }
    catch (err) {
        next(err)
    }
}

const editBook = async(req, res, next) => {
    try {
        const { body, id, bookId } = req
        const updatedBook  = await updateBook(body, id, bookId)

        res.status(200).json({
            status: 'success',
            message: 'Book updated successfully',
            data: updatedBook
        })
    }
    catch (err) {
        next(err)
    }
}

const getBooks = async(req, res, next) => {
    try {
        const books = await fetchBooks()

        res.status(200).json({
            status: 'success',
            message: 'Books fetched successfully',
            data: books
        })
    }
    catch (err) {
        next(err)
    }
}

const registerUserBook = async(req, res, next) => {
    try {
        const { id, bookId, book } = req
        const bookDetails = await addUserBook(id, bookId)

        res.status(200).json({
            status: 'success',
            message: `Book ${bookId} added to catalogue successfully`,
            data: { ...bookDetails, book}
        })
    }
    catch (err) {
        next(err)
    }
}

const getUserCatalogue = async(req, res, next) => {
    try {
        const { id } = req
        const books = await fetchUserBooks(id)

        res.status(200).json({
            status: 'success',
            message: 'Books in catalogue fetched successfully',
            data: books
        })
    }
    catch (err) {
        next(err)
    }
}

const removeUserBook = async(req, res, next) => {
    try {
        const { id, bookId } = req
        const book = await deleteUserBook(id, bookId)

        res.status(200).json({
            status: 'success',
            message: 'Deleted book in user catalogue successfully',
            data: book
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    registerBook,
    editBook,
    getBooks,
    registerUserBook,
    getUserCatalogue,
    removeUserBook
}