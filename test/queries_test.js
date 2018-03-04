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
      addTask()
    })
  })

  context('deleteTask', () => {
    it('deletes a task from the list database', () => {
      deleteTask()
    })
  })
})