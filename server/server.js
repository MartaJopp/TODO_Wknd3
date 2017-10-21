var express = require ('express');
var app = express();
var port = 5000 || process.env.PORT 
var bodyParser = require('body-parser'); // require body-parser
var taskRouter = require('./router/taskRouter.js'); // require taskRouter

app.use(bodyParser.urlencoded({extended:true})); //bodyParser 

// static files
app.use(express.static('server/public'));

// database folder that it is connecting to task router
app.use('/tasks', taskRouter); 

// start server
app.listen(port, function(){
    console.log ('listening on port', port); 
}); // end start server


