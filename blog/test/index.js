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
})