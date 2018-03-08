// jshint asi:true

const chai = require('chai')
const expect = chai.expect
const { list,
        addTask,
        deleteTask
} = require('../database/queries.js')
const { resetDatabase } = require('./helpers')

describe('Database queries', () => {

  beforeEach(resetDatabase)

  context('listTasks', () => {
    it('Returns an array with the task list items', () => {
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
      })
      .then(res => {
        expect(res.length).to.equal(7)
      })
    })
  })
})