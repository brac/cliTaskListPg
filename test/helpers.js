// jshint asi:true
const db = require('../database/queries.js')
const taskFixtures = require('./fixtures/tasks.json')


clearDatabase = () => {
  return new Promise((resolve, reject) => {
    db.deleteAllTasks()
    .then(res => {
      resolve('Tasks deleted')
    })
    .catch(err => {reject(new Error(`Encountered error trying to delete all tasks: ${err.message}`))})
  })
}

resetSequences = () => {
  return new Promise((resolve, reject) => {
    const client = new db.Client(db.databaseInfo)
    client.connect()
    .then(() => {
      client.query('ALTER SEQUENCE "tasks_id_seq" RESTART WITH 1')
      .then(() => {
        client.end()
        resolve('Sequences reset to 1')
      })
      .catch(err => {
        client.end()
        reject(new Error(`Encountered error trying to reset sequences: ${err.message}`))
      })
    })
    .catch(err => {
      client.end()
      reject(new Error(`Encountered error trying to connect: ${err.message}`))
    })
  })
}

insertTaskFixtures = () => {
  taskFixtures.map((task) => db.addTask(task.name, task.complete))
}

resetDatabase = () => {
  return deleteAllTasks()
    .then(() => {
      console.log('tasks deleted')
      resetSequences()
    })
    .then(() => {
      console.log('sequences reset')
      insertTaskFixtures()
    })
    .then(() => {
      console.log('Database Fixtures inserted!')
    })
    .catch(console.error)
}

// resetDatabase()

module.exports = { resetDatabase }