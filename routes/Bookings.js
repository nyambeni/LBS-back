
var connection = require('../conn/conn');
const express = require('express');
const e = require('express');




// API for listing available labs
exports.available =async function(request, response) 
{

    var time = 10;

  

    // else if statements to show available labs 
    if (time == 10  )
    {
        
   
      var slot = 'A';

       //update availability since slot time is over
        connection.query('UPDATE lab SET Lab_availability =  Lab_Capacity + 1  WHERE Lab_Slot =? ',[slot], function(error, results, fields)  
        {
        
            if (error) 
            { 
                response.send('there are some error with query');
            }
            else{
                  connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_availability  < Lab_Capacity', function(error, results, fields)  {
           
                    if (results.length > 0)
                    {
  
                        
                        response.send(results);

                       
                    }
                    else{
                        response.send('all labs are booked for the day');
                    }


               })
            }
       })
    }
  else if (time == 12 )
    {

        var slot = 'B';

        //update availability since slot time is over
         connection.query('UPDATE lab SET Lab_availability =  Lab_Capacity + 1  WHERE Lab_Slot =? ',[slot], function(error, results, fields)  
         {
         
             if (error) 
             { 
                 response.send('there are some error with query');
             }
             else{
                   connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_availability  < Lab_Capacity', function(error, results, fields)  {
            
                     if (results.length > 0)
                     {
                        response.send(results);
                     }
                     else{
                        response.send('all labs are booked for the day');
                     }
 
 
                })
             }
        })
    }
    else if(time > 13  &&  time <= 14 ){ //time from 10pm to 10.05 should set everything to 0


        

        //update availability since slot time is over
         connection.query('UPDATE lab SET Lab_availability =  0 ' ,function(error, results, fields)  
         {
         
             if (error) 
             { 
                 response.send('there are some error with query');
             }
             else{
                   connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_availability  < Lab_Capacity', function(error, results, fields)  {
            
                     if (results.length > 0)
                     {
                        response.send(results);
                     }
                     else
                     {
                        response.send('all labs are booked for the day');
                     }
 
 
                })
             }
        })
    
           

    }
    else
    {

        connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_availability  < Lab_Capacity', function(error, results, fields) 
         {
            
            if (results.length > 0)
            {
               response.send(results);
            }
            else{
                response.send('all labs are booked for the day');
            }
          

        })

   }

}






//API for making a booking

exports.labBooking=async function(request, response) 
{
    var labName = request.body.labName;
    var slot = request.body.slot;
    var stuNumber = request.body.stuNumber;

     
    console.log(labName);
    console.log(slot);
    console.log(stuNumber)


    if(labName && slot && stuNumber)
    {

        connection.query('SELECT * FROM booking WHERE Lab_Slot =? AND Lab_Name =? AND Stud_ID =? ',[slot,labName,stuNumber], function (error, results, fields)
        {
                if(results.length > 0)
                {
                    response.send('already booked a lab for this session');
                }  
                else 
                {
                    
                      
                    var booking1={

                        "Lab_Name":request.body.labName,
                        "Lab_Slot":request.body.slot,
                        "Stud_ID":request.body.stuNumber,          
                      
               
                    } ;

                    connection.query('SELECT Lab_Slot from booking where Lab_Slot =? AND Stud_ID = ?',[slot,stuNumber], function (error, results, fields) {
                    
                    if(results.length == 0){
                    connection.query('INSERT INTO booking SET ? ',[booking1], function (error, results, fields) {
                      if (error) 
                      {
                       
                        response.send('there are some error with query');
                        
                      }else
                      {
                      
                        connection.query('UPDATE booking SET Stud_ID = ?,Num_Bookings = Num_Bookings +1 WHERE Stud_ID =?', [stuNumber,stuNumber],function (error, results, fields){
            
            
                            response.send('successfully bookied for a lab');
                        })
                    
                  
                      }
                    
                    })//end of inserting
                  }else{
                      
                    response.send('cant book for more than one lab at the same time');
                    
                            
                  }
                })
                
                    
                }      
           })
        
    } 
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           /* if(results.length > 0)
            {
          
             
        var booking1={

            "Lab_Name":request.body.labName,
            "Lab_Slot":request.body.slot,
            "Stud_ID":request.body.stuNumber,          
          
   
        } ;
        connection.query('INSERT INTO booking SET ? ',[booking1], function (error, results, fields) {
          if (error) 
          {
           
            response.send('there are some error with query');
            
          }else
          {
          
            connection.query('UPDATE booking SET Lab_Name =?,Lab_Slot = ?,Stud_ID = ?,Num_Bookings = Num_Bookings +1 WHERE Stud_ID =?', [labName,slot,stuNumber,stuNumber],function (error, results, fields){


                response.send('successfully bookied for a lab');
            })


          }
        })//end of inserting
     
    }else{

        response.send('you have already booked a session for this time period');
 
     
    }
      
       
    })// slot checking









       
        /*connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_Name = ? AND Lab_Slot =? AND Lab_availability  < Lab_Capacity',[labName,slot], function(error, results, fields) { //checks the data
            if (results.length > 0) {
                
                
        
             
               
                connection.query('UPDATE lab SET Lab_availability =  Lab_availability + 1  WHERE Lab_Slot =? AND Lab_Name =?',[slot,labName], function(error, results, fields){ //updates and makes a booking

                    if (error) 
                    { 
                        response.send('there are some error with query');
                    }
                    else{
                        
                        var booking1={

                            "Lab_Name":request.body.labName,
                            "Lab_Slot":request.body.slot,
                            "Stud_ID":request.body.stuNumber,          
                          
                   
                        } 
                        connection.query('INSERT INTO booking SET ? ',[booking1], function (error, results, fields) {
                          if (error) {
                           
                            response.send('there are some error with query');
                            
                          }else{
                            
                            connection.query('UPDATE booking SET Num_bookings = Num_bookings +1 WHERE Stud_ID =?', [stuNumber],function (error, results, fields){


                                response.send('successfully bookied for a lab');
                            })
                            
                            
                          }
                        });//end of inserting data
                        

                    }
                })
                
    
               
    
              }else{
                
                response.send('lab is already full');
                
              }
            
    
          })//end of query
      


    } 
    else
    {
        response.send('Please Choose a Lab and Slot to make a booking');
    }
*/

}


exports.status=async function(request, response) {

    var stuNumber = request.body.stuNumber;
    console.log(stuNumber)

    connection.query('SELECT * FROM booking Where Stud_ID =?',[stuNumber], function (error, results, fields) {
        if (error) {
         
          response.send('there are some error with query');
          
        }else{
          
          response.send(results);
          
        }
      });
   


}