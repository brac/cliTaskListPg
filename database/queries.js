// jshint asi:true
// const { Pool } = require('pg')

// const databaseName = process.env.NODE_ENV === 'test' ? 'taskList_test' : 'taskList'
// const pool = new Pool({
//   user: process.env.USER,
//   host: 'localhost',
//   database: databaseName,
//   password: null,
//   port: 5432
// })

const db = require('./index.js')



list = () => {
  return db.query('SELECT * FROM tasks')
    .then(res => {
      db.end()
      return res.rows
    })
}


addTask = (taskName) =>  {
  return db.query('INSERT INTO tasks (name) VALUES ($1)', [taskName])
    .then(res => {
      db.end()
      return res.rows
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