const dotenv = require('dotenv')
const pgp = require('pg-promise')
const promise = require('bluebird')

dotenv.config()
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env

const cn = {
    host: 'localhost',
    port: 5432,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    max: 30 
}

const pg = pgp({ promiseLib: promise, noWarnings: true })
const db = pg(cn)

module.exports = db