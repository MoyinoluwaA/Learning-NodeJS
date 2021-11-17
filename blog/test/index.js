const { expect } = require('chai')
const request = require('supertest')
const app = require('../src/index')

// tdd, supertest, chai, mocha, jest

describe('blogs', () => {
    it('baseroute', (done) => {
        request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Welcome to my Blog API')
            expect(res.body.code).to.equal(200)
            done()
        })
    })

    it('createBlog', (done) => {
        request(app)
        .post('/api/blog')
        .send({
            name: 'Temi',
            author: 'Tope',
            domain: 'temitope@enyata.com'
        })
        .expect(201)
        .end((err, res) => {
            expect(res.body.message).to.equal('Added new blog')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('id')
            expect(res.body.data).to.have.property('name')
            expect(res.body.data).to.have.property('author')
            expect(res.body.data).to.have.property('domain')
            done()
        })
    })
    
    it('getBlogs', (done) => {
        request(app)
        .get('/api/blogs')
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Fetched all blogs')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('array')
            expect(res.body.data[0]).to.have.property('id')
            expect(res.body.data[0]).to.have.property('name')
            expect(res.body.data[0]).to.have.property('author')
            expect(res.body.data[0]).to.have.property('domain')
            done()
        })
    })
    
    it('getBlog', (done) => {
        request(app)
        .get('/api/blog/2')
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Found the blog with id 2')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('name')
            expect(res.body.data).to.have.property('author')
            expect(res.body.data).to.have.property('domain')
            done()
        })
    })
    
    it('updateBlog', (done) => {
        request(app)
        .put('/api/blog/2')
        .send({
            name: 'Moyinoluwa',
            author: 'Adenuga',
            domain: 'moyin@enyata.com'
        })
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Updated the blog with id 2')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('name')
            expect(res.body.data).to.have.property('author')
            expect(res.body.data).to.have.property('domain')
            done()
        })
    })

    it('deleteBlog', (done) => {
        request(app)
        .delete('/api/blog/4')
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('Deleted the blog with id 4')
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')            
            done()
        })
    })
})