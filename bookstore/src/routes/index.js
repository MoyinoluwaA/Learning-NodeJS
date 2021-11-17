const express = require('express')
const { registerBook, editBook, getBooks, registerUserBook, getUserCatalogue, removeUserBook } = require('../controllers/book')
const { registerUser, loginUser } = require('../controllers/user')
const checkDataExists = require('../middleware/checkData')
const validateInput = require('../middleware/validation')
const verifyToken = require('../middleware/verifyToken')
const { addBookSchema, updateBookSchema, addUserBookSchema } = require('../models/book')
const { createUserSchema, loginUserSchema } = require('../models/user')
const router = express.Router()

router.post(
    '/users/register',
    validateInput(createUserSchema, 'body'),
    checkDataExists('user', 'register'),
    registerUser
)

router.post(
    '/users/login',
    validateInput(loginUserSchema, 'body'),
    checkDataExists('user', 'login'),
    loginUser
)

router.post(
    '/books',
    verifyToken('access', 'admin'),
    validateInput(addBookSchema, 'body'),
    registerBook
)

router.put(
    '/books',
    verifyToken('access', 'admin'),
    validateInput(updateBookSchema, 'body'),
    checkDataExists('book', 'update'),
    editBook
)

router.get(
    '/books',
    verifyToken('access', 'all'),
    getBooks
)

router.post(
    '/user-books',
    verifyToken('access', 'customer'),
    validateInput(addUserBookSchema, 'body'),
    checkDataExists('book', 'add'),
    registerUserBook
)

router.get(
    '/user-books',
    verifyToken('access', 'customer'),
    getUserCatalogue
)

router.delete(
    '/user-books',
    verifyToken('access', 'customer'),
    checkDataExists('book', 'delete'),
    removeUserBook
)

module.exports = router