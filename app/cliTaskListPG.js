// jshint asi:true
const db      = require('../database/queries')
const command = process.argv[2]
const task    = process.argv[3]

taskList = (cmd, task) => {
  switch(cmd){
    case 'list':
      db.list()
      .then(res => {
        // Print the header
        console.log(`\nID Description \n-- ----------- `)

        // Print the list
        for (let i = 0; i < res.length; i++) {
          console.log(`${res[i].id}  ${res[i].name}`)
        }

        // Print the summation
        console.log(`\nYou have ${ res.length} tasks\n` )
      })
      .catch(err => { console.error(err.message)})
    break

    case 'add':
      db.addTask(task)
      .then(() => {
        db.list()
        .then(res => {
          console.log(`Created task: ${res[res.length-1].id}`)
        })
      })
      .catch(err => { console.error(err.message)})
    break

    case 'complete':
      db.completeTask(task)
      .then(() => {
        db.list()
        .then(res => {
          let taskName = res.find(t => { return t.id == task })
          console.log(`Completed task: ${ taskName.name }`)
        })
      })
      .catch(err => { console.error(err.message)})
    break

    case 'delete':
      db.list()
      .then(res => {
        let taskName = res.find(t => { return t.id == task })

        db.deleteTask(task)
        .then(() => {
          // console.log('i made it here')
          console.log(`Deleted task: ${taskName.name}`)
        })
        .catch(err => { console.error(err.message)})
      })
    break
  }
}

taskList(command, task)