# Command Line Task List with Postgres and SQL

This is a simple task list tool that will keep track of custom tasks entered by the user. The application allows for adding, completing, deleting and listing of tasks stored in a postgres database. This application assumes that you already have a postgres server running with default settings.

## Getting Started

Clone the repo from ```brac/cliTaskListPg```

Install the dependencies:
```npm install```

For the first time usage, create the initial database and load the schema
```npm db:start```

To reset your task list, reset the database:
```npm run db:reset```

Once the database is setup you can begin adding, completed, listing and deleting tasks. See below for examples

### Prerequisites

Be sure to have postgres installed and running on your local machine. I recommend using Brew to install and start/stop the service:

```brew install postgresql```

you can initialize or stop the daemon with these commands:

```brew services start postgresql``` or ```brew services stop postgresql.```

### Installing

To install, clone the repo from ```brac/cliTaskListPg```

Install the dependencies:
```npm install```

If this is a fresh install and you system does not yet have taskList database, run the following:
```npm db:start```

To reset your task list, reset the database:
```npm run db:reset```

To list your tasks run:
```./app/cliTaskListPg list```

To add a task run:
```./app/cliTaskListPg add 'my new task'```

To complete a task, task 3 in this example, run:
```./app/cliTaskListPg complete 3```

To delete a task, task 2 in this example: run:
```./app/cliTaskListPg delete 2```


## Running the tests

In order to run the query tests you will have to build the test database first. You only have to do this once:
```npm run test:db:start```

Then run the test suite:
```npm run test```


## Built With

* [Mocha and Chai](http://chaijs.com/) - Testing Framework
* [PG](https://www.npmjs.com/package/pg) - Postgres SQL Client
* [Node.js](https://nodejs.org/en/) - Package deployment


## Contributing

Submit a pull request if you have an idea on how I could improve this little tool.


## Authors

* **Ben Bracamonte** - *Initial work* - [Brac](https://github.com/brac)

## License

This project is licensed under the MIT License

## Acknowledgments

* Jared Grippe, javascript and programming guru
* Eric Nicholas, coding and moral support
* Lenny and Rudy, the goodest of boys