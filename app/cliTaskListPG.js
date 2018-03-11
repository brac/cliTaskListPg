// jshint asi:true
const db      = require('../database/queries')
const command = process.argv[2]
const task    = process.argv[3]

taskList = (cmd, task) => {
  switch(cmd){
    case 'list':
      db.list()
      .then(res => {
        console.log(res)
        // console.log(`I will list the following data: ${res}`)
      })
      break

    case 'addTask':
      db.addTask(task)
      .then(() => {
        console.log('I have added a task')
      })
      break

    case 'completeTask':
      db.completeTask(task)
      .then(() => {
        console.log('I have completed a task')
      })
      break

      case 'deleteTask':
        db.deleteTask()
        .then(() => {
          console.log('I deleted a task')
        })
      break
  }
}

taskList(command, task)