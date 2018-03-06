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

list = () => {
  client.connect()
  return client.query('SELECT * FROM tasks')
    .then((res) => {
      client.end()
      return res.rows
    })
}


addTask = (taskName) =>  {
  return pool.query('INSERT INTO tasks (name) VALUES ($1)', [taskName])
    .then(res => {
      pool.done()
      return 'Something was added'
    })
    .catch(e => {
      console.error(`Error in quiery File: ${e}`)
    })
}

deleteTask = (id) => {

}

module.exports = {
  list,
  addTask,
  deleteTask
}