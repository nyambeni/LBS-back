var connection = require('../conn/conn');
const express = require('express');
const e = require('express');



//API For Publishing a lab Schedule

exports.lab_Schedule =async function(request, response) {

      
    var labName = request.body.labName;
    var slot = request.body.slot;
    var capacity = request.body.capacity;
    var avail = 0;
    var date = request.body.date;
    
    
    if(labName && slot && capacity && date ){
         
       
        connection.query('SELECT * FROM lab WHERE Lab_Name =? AND Lab_Slot =? AND Lab_Capacity =? AND Lab_Date =?',[labName,slot,capacity,date], function (error, results, fields) {

        if(results.length > 0){
    
            response.send('You have already made this lab available to users' );
           }
           else
           {
            var lab_records={
    
                "Lab_Name":labName,
                "Lab_Slot":slot,
                        
                "Lab_Capacity":capacity,
                "Lab_availability":avail, 
                "Lab_Date":date,
       
            } 
            connection.query('INSERT INTO lab SET ?',[lab_records], function (error, results, fields) {
              if (error) {
               
                response.send('there are some error with query');
                
              }else{
                
                response.send('lab is now available for booking on this date ' + date );
                
              }
            });//end of inserting data

           }
        



        } ) 
       

    }
    else{
        response.send('Please enter values');	  
    }







}




//APi for sending admin notifications

exports.notification = async function (request, response)
{ let dt = JSON.stringify(new Date)
  let date = dt.substr(1,10)
  
  
  var notification_Date = date;
  var notification_message = request.body.Notification;




  if(notification_Date && notification_message ){
         
       
    connection.query('SELECT * FROM notifications WHERE Notification_Date  =? AND Notification =?',[notification_Date, notification_message], function (error, results, fields) {

    if(results.length > 0){

        response.send('You have already sent sent this mesage' );
       }
       else
       {
        var notification_records={

          

           
            "notification_Date":notification_Date,
                    
            "Notification":notification_message
        
   
        } 
        connection.query('INSERT INTO notifications SET ?',[notification_records], function (error, results, fields) {
          if (error) {
           
            response.send('there are some error with query');
            
          }else{
            
            response.send('Notification successullfy sent on this date ' + date );
            
          }
        });//end of inserting data

       }
    



    } ) 
   

}
else{
    response.send('Please enter values');	  
}





}