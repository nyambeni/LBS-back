const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = 3000;  // this is the port our express server will run on
const app = express(); // this is an instance of express

var connection = require('./conn/conn');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//initializing routes
var login = require('./routes/login');
var registration = require('./routes/register');

//code to test the get function

app.get('/',function(request,response){

     response.send('hello from the server');
})



app.listen(PORT,function(){

    console.log('server running on localhost:' + PORT);
})

//routers for login and registration
app.post('/registration',registration.register);
app.post('/login',login.login);

