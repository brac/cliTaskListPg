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



// idle client handeler
function addTask(taskName) {
  return pool.query('SELECT * FROM tasks')
    .then(res => {
      pool.end()
      return res.rows
    })
    .catch(e => {
      console.error(`Encounted Error: ${e}`)
    })
}

function deleteTask(id) {

}

module.exports = {
  addTask,
  deleteTask
}