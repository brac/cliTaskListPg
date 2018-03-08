// jshint asi:true
const { Pool, Client } = require('pg')

const databaseName = process.env.NODE_ENV === 'test' ? 'taskList_test' : 'taskList'
const databaseInfo = {
  user: process.env.USER,
  host: 'localhost',
  database: databaseName,
  password: null,
  port: 5432
}

list = () => {
  return new Promise((resolve,reject) => {
    const client = new Client(databaseInfo)

    client.connect()
    .then(() => {
      client.query('SELECT * FROM tasks')
      .then(res => {
        client.end()
        resolve(res.rows)
      })
      .catch(e => {
        client.end()
        reject(new Error(`Error during list query: ${e.message}`))
      })
    })
    .catch(e => {
      client.end()
      reject(new Error(`Error during list connection: ${e.message}`))
    })
  })
}

addTask = (taskName, complete) =>  {
  return new Promise((resolve, reject) => {
    const client = new Client(databaseInfo)
    if (complete == null) {complete = 'false'}

    // console.log(`trying to add: ${taskName}`)
    client.connect()
    client.query('INSERT INTO tasks (name, complete) VALUES ($1, $2)', [taskName, complete])
    .then(() => {
      client.end()
      resolve(`task added: ${taskName}`)
    })
    .catch(e => {
      client.end()
      reject(e.message)})
  })
}

deleteTask = (id) => {
  // TODO
}

deleteAllTasks = () => {
  return new Promise((resolve, reject) => {
    const client = new Client(databaseInfo)

    // console.log('Deleting all tasks')
    client.connect()
    client.query('DELETE FROM tasks')
    .then(() => {
      client.end()
      resolve(`All tasks deleted`)
    })
    .catch(e => { reject(new Error(`Error trying to delete something: ${e.message}`))})
  })
}

module.exports = {
  Client,
  databaseInfo,
  list,
  addTask,
  deleteTask,
  deleteAllTasks
}