
var connection = require('../conn/conn');

exports.available =async function(request, response) 
{

    var time = 8;

    connection.query('SELECT * FROM lab WHERE Lab_availability  <= Lab_Capacity', function(error, results, fields){
        
       
        if (results.length > 0)
        {
           response.send(results);

        }

  
  

    // else if statements to show available labs 
    if (time == 10   )
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
                  connection.query('SELECT * FROM lab WHERE Lab_availability  <= Lab_Capacity', function(error, results, fields)  {
           
                    if (results.length > 0)
                    {
                       response.send(results);
                    }


               })
            }
       })
    }
   if (time == 12 )
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
                   connection.query('SELECT * FROM lab WHERE Lab_availability  <= Lab_Capacity', function(error, results, fields)  {
            
                     if (results.length > 0)
                     {
                        response.send(results);
                     }
 
 
                })
             }
        })
    }
     if(time > 13  &&  time <= 15 ){ //time from 10pm to 8 am avialability be 0


        

        //update availability since slot time is over
         connection.query('UPDATE lab SET Lab_availability =  0 ' ,function(error, results, fields)  
         {
         
             if (error) 
             { 
                 response.send('there are some error with query');
             }
             else{
                   connection.query('SELECT * FROM lab WHERE Lab_availability  <= Lab_Capacity', function(error, results, fields)  {
            
                     if (results.length > 0)
                     {
                        response.send(results);
                     }
 
 
                })
             }
        })
    
           

    }
    else
    {

        connection.query('SELECT * FROM lab WHERE Lab_availability  <= Lab_Capacity', function(error, results, fields) 
         {
            
            if (results.length > 0)
            {
               response.send(results);
            }
          

        })

   }

})
}
