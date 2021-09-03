var connection = require('../conn/conn');
//const express = require('express');

exports.updatePassword =async function(request, response) 
{ 
    var stuNumber = request.body.stuNumber;
    var password = request.body.password;
    var newPassword = request.body.newPassword;
    var confirmPassword = request.body.confirmPassword;
    
    console.log(stuNumber);
    console.log(password);
    console.log(newPassword);
    console.log(confirmPassword);
    
    
    if ( password && newPassword && confirmPassword )
    { 
        connection.query('SELECT password FROM student where stud_no = ?', [stuNumber], function(error, results, fields)
        {
            if (results.length > 0)
            {
                if(results != password)
                {
                    if(password == newPassword)
                    {
                        response.send('The old and new password are the same!');
                    }
                    else
                    {
                        if(newPassword != confirmPassword)
                        {
                            response.send('The new passwords are not the same!');
                        }
                        else
                        {
                            connection.query('UPDATE student SET password = ? , confirm = ? WHERE stud_no =?',[newPassword,confirmPassword,stuNumber], function(error, results, fields)
                            { 
                                if (error)
                                { 
                                    response.send('there are some error with query');
                                }
                                else
                                {  
                                    response.send('password successfully updated');
                                }
                            })
                        }
                    }
                }
                else{
                    response.send('The old password is incorrect!');
                }
            }
        })
    }
    else
    {
        response.send('Please enter values');	
    }
}




exports.profileDetails =async function(request, response) {

    var stuNumber = request.body.stuNumber;
    console.log(stuNumber); 

    //fetch data from the student table
    connection.query('SELECT * FROM student where stud_no =?',[stuNumber], function(error, results, fields) {
        if (results.length > 0)
        { 
            response.send(results);
        }
    });
}