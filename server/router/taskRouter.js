var express = require('express');
var router = express.Router();
var poolModule = require('../modules/pool.js');
var pool = poolModule;
var tasks = [];
var pg = require('pg');

// var pg = require('pg');
// var config = {
//     database: 'deneb',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000
// }

// var pool = new pg.Pool(config);

router.post('/', function (req, res) { //post route with new tasks
    var task = req.body; // data received
    console.log(task); // should be the string received
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // connected to the database pool -1
            var queryText = 'INSERT INTO "tasks" ("todo", "completed") VALUES ($1, $2);';
            db.query(queryText, [task.todo, task.completed], function (errorMakingQuery, result) {
                done(); // pool +1
                if (errorMakingQuery) { //what is sent if an error on the query
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // end post route

router.get('/', function (req, res) {
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'SELECT * FROM "tasks";';
            db.query(queryText, function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // end get route

router.put('/:id', function (req, res) { // put route to update completion
    var task = req.body;
    var taskId = req.params.id; //only getting the id from the client I'm deleting

    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //var queryText = 'INSERT INTO "koalas" ("name", "age", "gender", "transfer", "notes") VALUES ($1, $2, $3 , $4 , $5 );';
            var queryText = 'UPDATE "tasks" SET "todo"= $1, "completed" = $2 WHERE "id" =$3;';
            db.query(queryText, [task.todo, task.completed, taskId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // end put route

router.delete('/:delete', function (req, res) { // put route to update completion
    var taskId = req.params.delete; //only getting the id from the client I'm deleting

    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // connected to DB pool -1
            var queryText = 'DELETE FROM "tasks" WHERE "id" = $1;';
            db.query(queryText, [taskId], function (errorMakingQuery, result) {
                // query has been sent and done is called to add connection basck
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // query worked
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // end delete route

module.exports = router; //allows for other files to use