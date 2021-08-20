
var connection = require('../conn/conn');
const express = require('express');




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

     
    console.log(labName);
    console.log(slot);


    if(labName && slot){
       
        connection.query('SELECT Lab_Name, Lab_Slot FROM lab WHERE Lab_Name = ? AND Lab_Slot =? AND Lab_availability  < Lab_Capacity',[labName,slot], function(error, results, fields) { //checks the data
            if (results.length > 0) {
                
                
        
             

                connection.query('UPDATE lab SET Lab_availability =  Lab_availability + 1  WHERE Lab_Slot =? AND Lab_Name =?',[slot,labName], function(error, results, fields){ //updates and makes a booking

                    if (error) 
                    { 
                        response.send('there are some error with query');
                    }
                    else{
                        response.send('you have successfully booked for a lab');
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


}