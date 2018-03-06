// jshint asi:true

const chai = require('chai')
const expect = chai.expect
const { list,
        addTask,
        deleteTask
} = require('../database/queries.js')

describe('Database queries', () => {
  // TODO: beforeEach(resetDatabase)

  context('listTasks', () => {
    it('Returns an array with the task list items', () => {
      return list()
        .then(res => {
          expect(res.length).to.equal(3)
        })
    })
  })

  context('addTask', () => {
    it('adds a task to the task list database', () => {
      return addTask('yet another task')
        .then(() => {
          return list()
        })
        .then(res => {
          expect(res.length).to.equal(4)
        })
        .catch(e => {console.error(`Found error during testing: ${e}`)})
    })
  })

  context('deleteTask', () => {
    xit('deletes a task from the list database', () => {
      deleteTask()
    })
  })
})