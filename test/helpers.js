// jshint asi:true
const db = require('../database/queries.js')
const taskFixtures = require('./fixtures/tasks.json')

resetSequences = () => {
  return new Promise((resolve, reject) => {
    const client = new db.Client(db.databaseInfo)

    client.connect()
    client.query('ALTER SEQUENCE "tasks_id_seq" RESTART WITH 1')
    .then(() => {
      client.end()
      resolve('Sequences reset to 1')
    })
    .catch( err => {
      client.end()
      reject(new Error(`Error trying to reset sequences: ${err.message}`))
    })
  })
}

insertTaskFixtures = () => {
  return Promise.all(
    taskFixtures.map((task) => db.addTask(task.name, task.complete))
  )
  .then(() =>{
    // console.log('Fixtures inserted')
  })
}

resetDatabase = () => {
  return new Promise ((resolve, reject) => {
    db.deleteAllTasks()
    .then(res => {
      // console.log(res)
      resetSequences()
      .then(res => {
        // console.log(res)
        insertTaskFixtures()
        .then(() => {
          resolve('database reset!')
        })
      })
      .catch(err => { reject(err)})
    })
    .catch(err => { reject(err)})
  })
}

module.exports = { resetDatabase }