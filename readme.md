# Command Line Task List using Postgres

This exercise is intended to show a demonstration of the following skill competencies:

Javascript
Node
npm
SQL
Mocha
Postgres

The original plan is as follows:

- Database setup
  * Write schema for database(s)
  * Write fixtures for test database
  * Write scripts in package.json to setup database(s)

- Database Query Setup
  * Review pg to connect to database, make queries
  * Add Task
  * List Tasks
  * Convert to Promises
  * Write helpers before proceeding
    * Clear
    * Insert
    * Reset
  * Suppress npm error message
    * Get it working

- Testing
  * Before/After Each
  * Helpers
    * Write scripts to reset databases
  * Confirm separate databases for testing and production
  - Queries
    - Test List
      * Returns list of tasks
      - Throw error if the list is empty
    - Test Add
      * Adds correct item
      * Increments ID number and count of items
      - Throws error if empty task provided
    - Test Complete
      - Marks correct item as completed
      - Number of tasks in list stays the same
      - Throws error if no item number was provided
    - Test Delete
      - Deletes the correct item
      - Lowers the count of the tasks by one
      - Throws an error if no item number was provided
      - Re-arranges id numbers (maybe...)
  - App
    - Test List
      - Outputs the task list
      - Outputs custom message if list is empty
    - Test Add
      - Add task to the list, output task added
      - Throws error if empty task provided
      - Creates list if absent
    - Test Complete
      - Completes the correct task
      - Outputs task completed
      - Throws error if no item number was provided
    - Test Delete
      - Deletes the item from the list
      - Outputs the task deleted
      - Throws an error if no id is provided
      - Throws an error if an invalid id is provided

* Helpers
  * Reset Database
    * Drop Tasks Table
    * Create Tasks Table
    * Insert Fixtures

- App
  - List Tasks
  - Add Task
  - Complete Task
  - Delete Task


Notes:
  Do I need to worry about resetting the ids every time I rebuild the database?
  ```javascript
  function resetSequences() {
  // sets all id series back to 1 so that we can deterministically work with ids
  return sql.db.any('ALTER SEQUENCE "contacts_id_seq" RESTART WITH 1;')
    .then(() => sql.db.any('ALTER SEQUENCE "groups_id_seq" RESTART WITH 1;'))
    .then(() => sql.db.any('ALTER SEQUENCE "group_members_id_seq" RESTART WITH 1;'))
}
```
Yes, yes you do. You'd have to reset the whole id sequence every time one task was deleted in order for it to also automatically reset back to 1 if everything was removed. Re-ordering the task ids if one is removed is not functionality outlined in the specs, so it won't be written.

