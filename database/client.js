// jshint asi:true
const { Client } = require('pg')

const databaseName = process.env.NODE_ENV === 'test' ? 'taskList_test' : 'taskList'

const client = new Client({
  user: process.env.USER,
  host: 'localhost',
  database: databaseName,
  password: null,
  port: 5432
})

client.connect()

module.exports = client
