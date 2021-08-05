var connection = require('../conn/conn');

exports.forgotPassword =async function(request, response) 
{

    var stuNumber = request.body.stuNumber;
    var email = request.body.email;
    
    console.log(stuNumber);
    console.log(email);

    
    connection.query('SELECT * FROM student where stud_no = ?', [stuNumber], function(error, results, fields)  {
    
        if (results.length > 0){
              
            response.send('write code to send email');
            
        }
        else{

            response.send('student number does not exist');            
        }
    
    })
}
    


