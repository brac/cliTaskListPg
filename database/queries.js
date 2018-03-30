const client = require('./client')

const list = () =>
  client.query('SELECT * FROM tasks ORDER BY id').then(
    queryResults => queryResults.rows,
    error => { throw new Error(`Error during list query: ${error}`) },
  )

const addTask = (taskName, complete) =>  {
  if (!taskName) {
    return Promise.reject(new Error('Please provide a task name'));
  }

  return client.query(
    `
    INSERT INTO
      tasks (name, complete)
    VALUES
      ($1, $2)
    RETURNING
      *
    `,
    [taskName, !!complete]
  ).then(
    queryResults => queryResults.rows[0],
    error => { throw new Error(`failed add task: ${error}`) },
  )
}

const deleteTask = (taskId) => {
  if (!taskId) {
    return Promise.reject(new Error('Please provide a task id'))
  }

  return client.query(
    `
      DELETE FROM
        tasks
      WHERE
        id = $1
      RETURNING *
    `,
    [taskId]
  ).then(
    queryResults => queryResults.rows[0],
    error => { throw new Error(`Error deleting task ${taskId}: ${error}`) },
  )
}

const deleteAllTasks = () =>
  client.query('DELETE FROM tasks')
    .catch(error => { throw new Error(`Error trying to delete all tasks: ${error}`) })

const completeTask = (taskId) => {
  if (!taskId) {
    return Promise.reject(new Error('Please provide a task id'))
  }

  return client.query(
    `
    UPDATE
      tasks
    SET
      complete=true
    WHERE
      id=$1
    RETURNING
      *
    `,
    [taskId]
  )
  .catch(error => {
    throw new Error(`Error trying to complete task ${taskId}: ${error}`)
  })
  .then(queryResults => queryResults.rows[0])
  .then(task => {
    if (!task) throw new Error(`unable to complete task ${taskId}`)
    return task
  })
}

module.exports = {
  list,
  addTask,
  deleteTask,
  deleteAllTasks,
  completeTask
}
