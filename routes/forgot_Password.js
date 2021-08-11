var connection = require('../conn/conn');

exports.forgotPassword =async function(request, response) 
{

    var stuNumber = request.body.stuNumber;
    var email = request.body.email;
    
    //console.log(stuNumber);
    console.log(email);

    
    connection.query('SELECT password FROM student where email = ?', [email], function(error, results, fields)  {
    
        if (results.length > 0){

            var pas = results//this string returns the users password
            response.send(JSON.stringify(pas));
            //res.send(JSON.stringify(pas));
            //write a code to send email with that pas string





            
        }
        else{

            response.send('student number does not exist');            
        }
    
    })
}
    


