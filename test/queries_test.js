// jshint asi:true
const chai              = require('chai')
const expect            = chai.expect
const { resetDatabase } = require('./helpers')
const { list,
        addTask,
        deleteTask,
        completeTask }  = require('../database/queries.js')

getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

describe('Database queries', () => {

  beforeEach(resetDatabase)
  // afterEach(resetDatabase)

  context('listTasks', () => {
    it('returns an array with the task list items', () => {
      return list()
      .then( res => {
        expect(res.length).to.equal(6)
      })
    })
  })

  context('addTask', () => {
    it('adds a task to the task list database', () => {
      return addTask('yet another tasky')
      .then(() => {
        return list()
        .then(res => {
          expect(res.length).to.equal(7)
        })
      })
    })
  })

  context('deleteTask', () => {
    it('deletes the correct task', () => {
      taskID = getRandom(1, 6)

      return deleteTask(taskID)
      .then(() => {
        return list()
        .then(res => {
          expect(res.length).to.equal(5)
          // TODO: Confirm which task was deleted
        })
      })
    })
    // TODO: sad path
  })

  context('completeTask', () => {
    it('marks the correct task as complete', () => {
      taskID = getRandom(1, 6)

      return completeTask(taskID)
      .then(() => {
        return list()
        .then(res => {
          let task = res.find((t) => { return t.id == taskID })
          expect(task.complete).to.equal(true)
        })
      })
    })
    // TODO: sad path
  })
})














