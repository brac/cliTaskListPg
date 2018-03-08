// jshint asi:true
const chai              = require('chai')
const expect            = chai.expect
const { resetDatabase } = require('./helpers')
const { list,
        addTask,
        deleteTask,
        completeTask }  = require('../database/queries.js')

describe('Database queries', () => {

  beforeEach(resetDatabase)
  // afterEach(resetDatabase)

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
        .then(res => {
          expect(res.length).to.equal(7)
        })
      })
    })
  })

  context('deleteTask', () => {
    it('deletes the correct task', () => {
      return deleteTask('2')
      .then(() => {
        return list()
        .then(res => {
          // console.log(res)
          expect(res.length).to.equal(5)
        })
      })
    })
    // TODO: sad path
  })

  context('completeTask', () => {
    // TODO: happy path
    // TODO: sad path
  })
})














