// jshint asi:true
const { Pool } = require('pg')

function addTask(name) {
  console.log('I will add a task')
}

function deleteTask(id) {
  console.log('I will delete a task')
}

module.exports = {
  addTask,
  deleteTask
}