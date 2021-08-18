var connection = require('../conn/conn'); 


//call back function for route post
exports.login =async function(request, response) {  


   var stuNumber = request.body.stuNumber;
   var password = request.body.password;

   console.log(stuNumber); 
   console.log(password);

   
   if (stuNumber && password) 
   {

   
     //check if account exist
      connection.query('select * from student where stud_no = ? AND password =?',[stuNumber,password], function(error, results, fields) {
        if (results.length > 0) {
            
            response.send('you have sucessfully loged in');
            

           

          }else{
            
            response.send('incorrect username or password');
            
          }
        

      })//end of query
     


   }//end of if statements that checks that values are entered
   else{
    response.send('Please enter values');	
    }


}//end of call back function








//call back function for route post FOR ADMIN
exports.adminLogin =async function(request, response) {  


  var admin_D = request.body.admin_D;
  var password = request.body.password;

  console.log(admin_D); 
  console.log(password);

  
  if (admin_D && password) 
  {

  
    //check if account exist
     connection.query('select * from admin where admin_D = ? AND password =?',[admin_D,password], function(error, results, fields) {
       if (results.length > 0) {
           
           response.send('you have sucessfully loged in');
           

          

         }else{
           
           response.send('incorrect username or password');
           
         }
       

     })//end of query
    


  }//end of if statements that checks that values are entered
  else{
   response.send('Please enter values');	
   }


}//end of call back function


