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
var profile = require('./routes/profile');
var admin = require('./routes/admin');



//code to test the get function

app.get('/j',function(request,response){

     let dt = JSON.stringify(new Date)
     let date = dt.substr(1,10)
     let time =dt.substr(12,2);
    
    response.send(dt)
    
    
})
     
 


app.listen(PORT,function(){

    console.log('server running on localhost:' + PORT);
})

//routers for login and registration
app.post('/registration',registration.register);
app.get('/login',login.login);
app.post('/login',login.login);
app.post('/forgotPassword',forgotPassword.forgotPassword);
app.get('/availableLabs',booking.available);
app.post('/book',booking.labBooking);
app.post('/adminLogin', login.adminLogin);
app.post('/bookingStatus',booking.status);
app.post('/Lec_registration',registration.Lec_register)
app.delete('/cancelBooking',booking.cancelBooking)
app.get('/bookingStatus',booking.status);
app.post('/lec_login',login.lec_login);
app.post('/Lec_registration',registration.Lec_register)
app.post('/updatePassword',profile.updatePassword);
app.post('/profile',profile.profileDetails);
app.post('/lab_Schedule',admin.lab_Schedule);
app.post('/notification',admin.notification);  
