
var connection = require('../conn/conn');
const express = require('express');
const e = require('express');




// API for listing available labs
exports.available =async function(request, response) 
{

   
    let dt = JSON.stringify(new Date)
    let date = dt.substr(1,10)
    let time = dt.substr(12,2);

    let currentTime = time;

   
    connection.query('SELECT * FROM lab WHERE Lab_Date = ? ',[date], function(error, results, fields)  
      {
          if(results.length > 0){
            if (currentTime == 9  ) //session for 8 should disapper at 9 (slot A)
            {
                
           
              var slot = 'A';
        
               //update availability since slot time is over
                connection.query('UPDATE lab SET Lab_availability =  Lab_Capacity + 1  WHERE Lab_Slot =?  AND Lab_Date =?',[slot,date], function(error, results, fields)  
                {
                
                    if (error) 
                    { 
                        response.send('there are some error with query');
                    }
                    else{
                          connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_availability  < Lab_Capacity AND Lab_Date =?',[date], function(error, results, fields)  {
                   
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
          else if (currentTime == 10 )//session for 9 to 10 should disapper at 10 (slot B)
            {
        
                var slot = 'B';
        
                //update availability since slot time is over
                 connection.query('UPDATE lab SET Lab_availability =  Lab_Capacity + 1  WHERE Lab_Slot =? AND Lab_Date =?',[slot,date], function(error, results, fields)  
                 {
                 
                     if (error) 
                     { 
                         response.send('there are some error with query');
                     }
                     else{
                           connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_availability  < Lab_Capacity AND Lab_Date =?',[date], function(error, results, fields)  {
                    
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
            else if(currentTime  == 23){ //time from 10pm to 10.05 should set everything to 0
        
        
                
        
                //update availability since slot time is over
                 connection.query('UPDATE lab SET Lab_availability =  0  WHERE  Lab_Date =?',[date],function(error, results, fields)  
                 {
                 
                     if (error) 
                     { 
                         response.send('there are some error with query');
                     }
                     else{
                           connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_availability  < Lab_Capacity AND Lab_Date =?',[date], function(error, results, fields)  {
                    
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
        
                connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_availability  < Lab_Capacity AND Lab_Date =?',[date], function(error, results, fields) 
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
          else{

            response.send('no labs published for this day');
          }


      })// end of checking for todays date
      



    // else if statements to show available labs 
   

}






//API for making a booking

exports.labBooking=async function(request, response) 
{
    
    var stuNumber = request.body.stuNumber;
    var labAndSlot = request.body.labAndSlot;
     
    
    
    console.log(stuNumber)
    console.log(labAndSlot);


    if(stuNumber && labAndSlot)
    {
        var labName = labAndSlot.substr(0,6);
        var slot = labAndSlot.substr(16,1);
        var text = stuNumber;

       // response.send(labName + " "+slot )
        //response.send(text)
   
        connection.query('SELECT * FROM booking WHERE Lab_Slot =? AND Lab_Name =? AND Stud_ID =? ',[slot,labName,stuNumber], function (error, results, fields)
        {
                if(results.length > 0)
                {
                    response.send('already booked a lab for this session');
                }  
                else 
                {
                    
                      
                    var booking1={

                        "Lab_Name":labName,
                        "Lab_Slot":slot,
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
            
                          connection.query('UPDATE lab SET Lab_availability =  Lab_availability + 1  WHERE Lab_Slot =? AND Lab_Name =?',[slot,labName], function(error, results, fields){ //updates and makes a booking

                            if (error) 
                            { 
                                response.send('there are some error with query');
                            }
                            else{
                            response.send("you have successfully booked for a lab");
                            }

                          })// end of query for updation availability 
                        })// end of query for booking
                    
                  
                      }
                    
                    })//end of inserting
                  }else{
                      
                    response.send('cant book for more than one lab at the same time');
                    
                            
                  }
                })
                
                    
                }      
           })
       
    } 
           


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


//APi for cancelling a bookng
exports.cancelBooking=async function(request, response) {


  var id = request.body.id
  var labName = request.body.labName;
  var slot = request.body.slot;
  var stuNumber = request.body.stuNumber;

   
  console.log(labName);
  console.log(slot);
  console.log(stuNumber)
  console.log(id)





  connection.query('DELETE  FROM booking where Booking_ID=?  AND Lab_Name =? AND Lab_Slot =? AND Stud_ID' , [id,labName,slot,stuNumber], function (error, results, fields) {
	  if (error) {}else{
	  
   
    connection.query('UPDATE lab SET Lab_availability =  Lab_availability -1   WHERE Lab_Slot =? AND Lab_Name =?',[slot,labName], function(error, results, fields){ //updates and makes a booking

      if (error) 
      { 
          response.send('there are some error with query');
      }
      else{
      response.send('booking has been cancelled');
      }
    
    })

  }






	});

}