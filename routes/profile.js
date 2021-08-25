var connection = require('../conn/conn');
//const express = require('express');

exports.updatePassword =async function(request, response) 
{ 
   
    var password = request.body.password;
    var confirm = request.body.confirm;
    var stuNumber = request.body.stuNumber;

    console.log(password);
    console.log(confirm);
    console.log(stuNumber);

   

   if(password && confirm)
   {
        if(password == confirm)
        {
            connection.query('UPDATE student SET password = ? , confirm = ? WHERE stud_no =?',[password,confirm,stuNumber], function(error, results, fields)
                { 
                    if (error) 
                    { 
                        response.send('there are some error with query');
                    }
                    else
                    {  
                        response.send('password successfully updated')
                    }
                })
        }
        else{
            response.send('password dont match');
        }
   }else{
       response.send('Please enter values')
   }
}




exports.profileDetails =async function(request, response) {

    var stuNumber = request.body.stuNumber;
    console.log(stuNumber); 

    //fetch data from the student table
    connection.query('SELECT * FROM student where stud_no =?',[stuNumber], function(error, results, fields) 
    { 
        response.send(results);
    });
}