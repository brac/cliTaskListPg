// jshint asi:true
const { Pool } = require('pg')

const databaseName = process.env.NODE_ENV === 'test' ? 'taskList_test' : 'taskList'
const pool = new Pool({
  user: process.env.USER,
  host: 'localhost',
  database: databaseName,
  password: null,
  port: 5432
})


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },

  getClient: () => {

  }
}