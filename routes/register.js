var connection = require('../conn/conn'); 


//call back function for route post
exports.register =async function(request, response) {  

     //fetch data
    var username = request.body.username;
    var surname = request.body.surname;
    var email = request.body.Email;
    var studentno = request.body.stuNumber;
    var password = request.body.Password;
	var confirm = request.body.confirm;
      
    
    console.log(username);
	console.log(surname);
	console.log(email);
	console.log(stuNumber); 
    console.log(password);
    console.log(confirm);


    //check if user exists

    




}

