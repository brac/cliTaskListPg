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
        .then( res => {
          console.log(res)
        })
    })
  })

  context('addTask', () => {
    xit('adds a task to the task list database', () => {
      return addTask('some other task')
        .then(res => {
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