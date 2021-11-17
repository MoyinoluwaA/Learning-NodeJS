const { expect } = require('chai')
const request = require('supertest')
const app = require('../src/index')
require('dotenv').config()


describe('bookstore', () => {
    it('baseroute', (done) => {
        request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Welcome to bookstore API')
            expect(res.body.code).to.equal(200)
            done()
        })
    })

    it('createUser', (done) => {
        request(app)
        .post('/api/users/register')
        .send({
            first_name: 'Mary',
            last_name: 'Okosun',
            email: 'mary@enyata.com',
            password: 'password',
            role: 'customer'
        })
        .expect(201)
        .end((err, res) => {
            expect(res.body.message).to.equal('User added successfully')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('id')
            expect(res.body.data).to.have.property('first_name')
            expect(res.body.data).to.have.property('last_name')
            expect(res.body.data).to.have.property('email')
            expect(res.body.data).to.have.property('role')
            done()
        })
    })
    
    it('loginUser', (done) => {
        request(app)
        .post('/api/users/login')
        .send({
            email: 'mary@enyata.com',
            password: 'password'
        })
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('User logged in successfully')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('role')
            expect(res.body.data).to.have.property('token')
            done()
        })
    })

    const ADMIN_TOKEN = process.env.ADMIN_TOKEN
    const CUSTOMER_TOKEN = process.env.CUSTOMER_TOKEN
    
    it('addBooks', (done) => {
        request(app)
        .post('/api/books')
        .set('x-access-token', ADMIN_TOKEN)
        .send({
            title: 'Introduction to Programming',
            author: 'Oluwatimileyin Akinpelu'
        })
        .expect(201)
        .end((err, res) => {
            expect(res.body.message).to.equal('Book added successfully')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('id')
            expect(res.body.data).to.have.property('title')
            expect(res.body.data).to.have.property('author')
            done()
        })
    })
    
    it('updateBook', (done) => {
        request(app)
        .put('/api/books')
        .query({
            id: 2
        })
        .set('x-access-token', ADMIN_TOKEN)
        .send({
            title: 'Beginner Javascript',
            author: 'Adenuga',
        })
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Book updated successfully')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('id')
            expect(res.body.data).to.have.property('author')
            expect(res.body.data).to.have.property('title')
            expect(res.body.data).to.have.property('updated_at')
            done()
        })
    })

    it('getBooks', (done) => {
        request(app)
        .get('/api/books')
        .set('x-access-token', CUSTOMER_TOKEN)
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Books fetched successfully')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('array')    
            expect(res.body.data[0]).to.have.property('id')
            expect(res.body.data[0]).to.have.property('author')
            expect(res.body.data[0]).to.have.property('title')   
            expect(res.body.data[0]).to.have.property('created_at')
            expect(res.body.data[0]).to.have.property('updated_at')     
            done()
        })
    })


    it('addBookToCatalogue', (done) => {
        request(app)
        .post('/api/user-books')
        .set('x-access-token', CUSTOMER_TOKEN)
        .send({
            book_id: 2
        })
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Book 2 added to catalogue successfully')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('id')
            expect(res.body.data).to.have.property('book').to.be.an('object')
            expect(res.body.data.book).to.have.property('title')
            expect(res.body.data.book).to.have.property('author')
            done()
        })
    })

    it('getUserBooks', (done) => {
        request(app)
        .get('/api/user-books')
        .set('x-access-token', CUSTOMER_TOKEN)
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Books in catalogue fetched successfully')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('array')    
            expect(res.body.data[0]).to.have.property('id')
            expect(res.body.data[0]).to.have.property('author')
            expect(res.body.data[0]).to.have.property('title')   
            expect(res.body.data[0]).to.have.property('created_at')
            expect(res.body.data[0]).to.have.property('updated_at')     
            done()
        })
    })

    it('deleteUserBook', (done) => {
        request(app)
        .delete('/api/user-books')
        .set('x-access-token', CUSTOMER_TOKEN)
        .query({
            book_id: 1
        })
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Deleted book in user catalogue successfully')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')            
            done()
        })
    })
})