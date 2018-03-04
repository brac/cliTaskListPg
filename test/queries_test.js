// jshint asi:true

const chai = require('chai')
const expect = chai.expect
const { addTask,
        deleteTask
} = require('../database/queries.js')

describe('Database queries', () => {
  // TODO: beforeEach(resetDatabase)

  context('addTask', () => {
    it('adds a task to the task list database', () => {
      return addTask('some task')
        .then(res => {
          console.log('got this in testing')
          console.log(res)
        })
    })
  })

  context('deleteTask', () => {
    xit('deletes a task from the list database', () => {
      deleteTask()
    })
  })
})