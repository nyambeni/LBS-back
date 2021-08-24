 const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = 3000;  // this is the port our express server will run on
//Access-Control-Allow-Origin: http://localhost:3000;
const app = express(); // this is an instance of express

var connection = require('./conn/conn');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();    
});


//initializing routes
var login = require('./routes/login');
var registration = require('./routes/register');
var forgotPassword = require('./routes/forgot_Password');
var booking = require('./routes/Bookings');




//code to test the get function

app.get('/',function(request,response){

     let dt = new Date("T11:30")
     
      response.send(dt);
})
 


app.listen(PORT,function(){

    console.log('server running on localhost:' + PORT);
})

//routers for login and registration
app.post('/registration',registration.register);
app.post('/login',login.login);
app.post('/forgotPassword',forgotPassword.forgotPassword);
app.get('/availableLabs',booking.available);
app.post('/book',booking.labBooking);
app.post('/adminLogin', login.adminLogin);
app.get('/bookingStatus',booking.status);
app.post('/Lec_registration',registration.Lec_register)
