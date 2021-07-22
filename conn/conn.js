//this is the only one needed here 
var mysql = require('mysql');

//npm isntall sql


//connect to database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'labbookingsystem'
});
 
 
connection.connect(function(err) {
  if (err)
  {
	  throw err
	  console.log('You are not connected with mysql database...')
  }else{
  console.log('You are now connected with mysql database...')
  }
})

module.exports = connection;