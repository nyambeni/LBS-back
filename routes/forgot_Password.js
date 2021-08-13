var connection = require('../conn/conn');

exports.forgotPassword =async function(request, response) 
{

    var stuNumber = request.body.stuNumber;
    var email = request.body.email;
    
    console.log(stuNumber);
    console.log(email);

    
    connection.query('SELECT password FROM student where stud_no = ?', [stuNumber], function(error, results, fields)  {
    
        if (results.length > 0){

            var pas = results//this string returns the users password
            response.send(JSON.stringify(pas));
            //res.send(JSON.stringify(pas));
           
            //write a code to send email with that pas string
            var nodemailer = require('nodemailer')
            var transporter = nodemailer.createTransport({
            
                service:'gmail',
                auth:{
                    user:'godfrey555mabena@gmail.com',
                    pass:'godfreyzo'
                    
                }


            });

            var mailOptions ={

                from:'godfrey555mabena@gmail.com',
                to:JSON.stringify(email),
                subject:'lab booking system password',
                text: JSON.stringify(pas)

            };


            transporter.sendMail(mailOptions,function(error,info){

                if(error){
                    console.log(error)
                }else{
                    console.log('Email sent ' + info.response)
                }


            })


            
        }
        else{

            response.send('student number does not exist');            
        }
    
    })
}
    


