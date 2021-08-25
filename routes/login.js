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
      connection.query('select stud_no, stu_name, stud_surname from student where stud_no = ? AND password =?',[stuNumber,password], function(error, results, fields) {
        if (results.length > 0) {
            
          
            response.send(results);
            
             
           

          }else{
            
            response.send('incorrect username or password');
            
          }
        

      })//end of query
     


   }//end of if statements that checks that values are entered
   else{
    response.send('Please enter values');	
    }


}//end of call back function



var connection = require('../conn/conn'); 


//login forn admin


exports.adminLogin =async function(request, response) { 


    var Admin_ID = request.body.Admin_ID;
    var Admin_Pass = request.body.Admin_Pass;
  
    console.log(Admin_ID); 
    console.log(Admin_Pass);
  
    
    if (Admin_ID && Admin_Pass) 
    {
  
    
      //check if account exist
       connection.query('select * from admin where Admin_ID = ? AND Admin_Pass =?',[Admin_ID,Admin_Pass], function(error, results, fields) {
         
         if ( results.length > 0) {
             
             response.send('you have sucessfully loged in');
             
  
            
  
           }else{
             
             response.send('incorrect username or password');
             
           }
         
  
       })//end of query
      
  
  
    }//end of if statements that checks that values are entered
    else{
     response.send('Please enter values');	
     }
  
    }
  
    var connection = require('../conn/conn'); 


    //login forn lecture
    
    
    exports.lec_login =async function(request, response) { 
    
    
        var lec_id = request.body.lec_id;
        var password = request.body.password;
      
        console.log(lec_id); 
        console.log(password);
      
        
        if (lec_id && password) 
        {
      
        
          //check if account exist
           connection.query('select * from lecture where lec_id = ? AND password =?',[lec_id,password], function(error, results, fields) {
             
             if ( results.length > 0) {
                 
                 response.send('you have sucessfully loged in');
                 
      
                
      
               }else{
                 
                 response.send('incorrect username or password');
                 
               }
             
      
           })//end of query
          
      
      
        }//end of if statements that checks that values are entered
        else{
         response.send('Please enter values');	
         }
      
        }
  
  