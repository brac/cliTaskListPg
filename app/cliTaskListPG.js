#!/usr/local/bin/node
// jshint asi:true

const queries = require('../database/queries')

const commands = {}

commands.list = () =>
  queries.list().then(tasks => {
    // Print the header
    console.log(`ID Description Completed`)
    console.log(`-- ----------- ---------`)
    // Print the list
    tasks.forEach(task => {
      console.log(`${task.id}  ${task.name}  ${task.complete ? 'complete' : ''}`)
    })
    // Print the summation
    console.log(`\nYou have ${tasks.length} tasks\n` )
  })

commands.add = (task) =>
  queries.addTask(task).then(task => {
    console.log(`Created task: ${task.id}`)
  })


commands.complete = (taskId) =>
  queries.completeTask(taskId).then(task => {
    console.log(`Completed task ${task.id}`)
  })

commands.delete = (taskId) =>
  queries.deleteTask(taskId).then(task => {
    if (!task) throw 'That task id has been deleted or is not present'
    console.log(`Deleted task: ${task.name}`)
  })

{
  const command = process.argv[2]
  if (command in commands){
    commands[command](process.argv[3])
      .then(
        () => {
          process.exit(0)
        },
        error => {
          console.error(`Error: ${error}`)
          process.exit(1)
        }
      )
  }else{
    console.error(`Error: unknown command "${command}"`)
    process.exit(1)
  }
}
