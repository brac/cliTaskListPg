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

    // Promise method
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

    // Callback method
    // client.connect()
    // client.query('SELECT * FROM tasks', (err, res) => {
      // if (err) {reject(new Error (`Error encountered during list query: ${err.message}`))}
      // client.end()
      // resolve(res.rows)
    // })
  })
}

addTask = (taskName) =>  {
  return new Promise((resolve, reject) => {

    // Promise method
    const client = new Client(databaseInfo)
    client.connect()
      .then(() => {
        client.query('INSERT INTO tasks (name) VALUES ($1)', [taskName])
        .then(() => {
          client.end()
          resolve(`Task added: ${taskName}`)
        })
        .catch(e => {
          client.end()
          reject(new Error(`Error during addTask query: ${e.message}`))
        })
      })
      .catch(e => {
        client.end()
        reject(new Error(`Error during addTask connection: ${e.message}`))
      })

    // Callback method
    // client.connect()
    // client.query('INSERT INTO tasks (name) VALUES ($1)', [taskName], (err, res) => {
      // if (err) {reject(new Error(`Error encounted during addTask query: ${err.message}`))}
      // client.end()
      // resolve('task added')
    // })
  })
}

deleteTask = (id) => {

}

module.exports = {
  list,
  addTask,
  deleteTask
}