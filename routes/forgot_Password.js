var connection = require('../conn/conn');

exports.forgotPassword =async function(request, response) 
{

    var stuNumber = request.body.stuNumber;
    var email = request.body.email;
    
    console.log(stuNumber);
    console.log(email);

    if(stuNumber){
        if(email){

            response.send('success'); 

        }
        else{
            response.send('enter your your email'); 
        }
       
    }
    else{
        response.send('enter your student number');
    }


}