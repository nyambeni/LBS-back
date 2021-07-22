var connection = require('../conn/conn');
// require the bcrypt module
//var bcrypt = require('bcrypt'); 


//call back function for route post
exports.register =async function(request, response) 
{  

     //fetch data
    var stuNumber = request.body.stuNumber;
    var name = request.body.name;
    var surname = request.body.surname;
    //var email = request.body.Email;
    var password = request.body.password;
	var confirm = request.body.confirm;
      
    
    console.log(name);
	console.log(surname);
	//console.log(email);
	console.log(stuNumber); 
    console.log(password);
    console.log(confirm);



    if ( stuNumber && name && surname && password && confirm) 
    {
        // check if user exists
          
                connection.query('SELECT * FROM student where stud_no = ?', [stuNumber], function(error, results, fields) 
             {
                if (results.length > 0)
                {
                    response.send('User Already has an account');
                }else{
                    //if the user is not found
                    
                                    var today = new Date();
                                    var student1={

                                        "stud_no":request.body.stuNumber,
                                        "stu_name":request.body.name,
                                        "stud_surname":request.body.surname,          
                                       // "email":request.body.Email,
                                        "password":request.body.password, 
                                        "is_verified":request.body.confirm,
                               
                                    }
                                    
                                    
                                    
                                    connection.query('INSERT INTO student SET ?',[student1], function (error, results, fields) {
                                      if (error) {
                                       
                                        response.send('there are some error with query');
                                        
                                      }else{
                                        
                                        response.send('user registered sucessfully');
                                        
                                      }
                                    });//end of inserting data
                                
                  
                }		//end of the if when the user  is not found		
        
                
     
            });//end of searching for a user
        
            
        } else{
        response.send('Please enter values');	
        }
    
        
        
    }
    






