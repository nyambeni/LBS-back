var http = require("http");
var express = require('express');
var app = express();
var router = express.Router(); // this one and var app = express(); work the same way 
// require the bcrypt module
//var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
//var session = require('express-session')
// this will bring the code for database connection
var connection = require('./conn/conn'); // this path goes out the current directory and goes to find connction  


//initializing routes
//var login = require('./routes/login');
//var registration = require('./routes/register');

//we are using app because of express
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//this is the server for 
var server = app.listen(3000, "127.0.0.1", function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log(" listening at http://%s:%s", host, port)
   
  });

  app.get('/', function(req, res) {
    console.log("First test")
});

//routers for login and registration
//app.post('/registration',registration.register);
//app.post('/login',login.login);












