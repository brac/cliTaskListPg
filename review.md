# Command Line Task List with Postgres
This project was intended to showcase competence with Javascript, SQL, PG, Mocha and asynchronous code. The following is a breakdown of the process that I followed.

### Setup
I wanted to utilize TDD while developing this app so my first plans were to build just enough to get a testing suite working, and then double back and write the rest of my queries using the tests as a guide.

Firstly I crated a new npm package and installed the dependencies, in this case mocha, chai, and pg. I think that mocha and chai may just be dev dependencies and I could find a way to omit them from production deployments.

Then I wrote the scripts that would go into my package.json file. These scripts would drop, create and load the schema for my databases, of which there are two, a testing database and a regular database. I would use these for resetting my testing environment while I was still developing the queries and later the ```beforeEach()``` function.

Finally I wrote the schema for my database table and tested the above scripts.

### Queries_test
I wanted to start writing tests right away but before I could get too far I found I needed to figure out how to get pg to talk to my database. I wrote a little list query that would just print out any response and then go to work getting my first query working.

#### list()
While I could have used a ```pool``` I used a ```client``` because I am only one client connecting to my database so I do not need to concern myself with additional checkouts. This may be something I will have to revisit in the future for more complex apps.

Following the documentation I made the pg query using promises and resolved a success and rejected errors. I found that create a new client for each query would allow me to avoid errors about the same client being checked out multiple times.

#### addTask()
This was an important function as I was going to use it for my ```beforeEach()``` call to reset the database in between each test. I wrote some error handling at the top of this function so we could just throw an error right off the bat if not enough information was provided. Otherwise this too returns a promise.

#### deleteTask()
This one has written in much the same way as the one above, with a little error handling at the top so we can avoid unnecessary database queries.

#### deelteAllTasks()
I thought that I would be able to get by with just ```addTask()``` and ```deleteTask()``` but I ended up writing this function to quickly delete all the tasks.

### Helpers
I knew now that I had enough functions to write my ```beforeEach()``` call and with that I could start doing some more complicated tests without having to manually reset the testing database.

#### resetSequences()
Turns out when you delete a record from a database it will not reset all the ids for the remaining records. Makes sense, but if I'm resetting the database then I want those numbers to be rest too so I write a function to do that.

#### insterTaskFixtures()
This was a fun one. It calls ```addTask()``` a bunch of times with the fixture data. We wait on all those promises with ```Promise.all()``` and return a success when they finish. This is nice because each time we get a different order of items inserted.

#### restDatabase()
This is the only function that I will export from helpers and it just calls the other functions in the same file. We can then take this function can call it in our ```beforeEach()``` back in our testing suite. Now we can get some more tests going!

#### delteTask() and completeTask()
These are pretty similar functions. Each has some error handling at the top to prevent unnecessary database queries and then they call ```list()``` to confirm or get back some data to send back to the original call.

At this point I had completed my queries and their respective tests. Now all I needed to do was write the app itself.

Since I was sure my queries were going to work, writing the app was pretty straight forward.

For each command call that the user may enter, we have a ```case``` that will catch it. I should include a default..... Some of these, like ```complete``` and ```delete``` have some error checking right off the bat, as we need to call ```list()``` to confirm the execution so we do that first before trying to run the query.

_A little bit of formatting and the app is good to go!_

