const {Pool} = require('pg')
const fs = require('fs')

module.exports = new Pool({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
})