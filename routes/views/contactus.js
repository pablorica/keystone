var keystone = require('keystone'),
	Enquiry = keystone.list('Enquiry'),
    async = require('async');
    
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	var email = req.body.email;
    var name = req.body.name;
    var subject = 'the_subject: '+req.body.subject;
    var comments = ' =================  comments: '+ req.body.comments;
    
    var error=1;
    
    if (email!='' && subject!='' && comments!='' && name!='') {
    	error=0;
    }
    
    console.log(error);
    
    console.log('email: '+email);
    console.log('name: '+name);
    console.log('subject: '+subject);
    console.log('comments: '+comments);
    
    if (error==0) {
    
	
	var the_message = new Enquiry.model({ name: { first: name, last: ''}, email: email, phone: '+12123456789', enquiryType: 'message', message: { html: subject+' '+comments, md: '' }});
		
		//var the_message = new Enquiry.model({ name: { first: name, last: ''}, email: email, phone: '+12123456789', enquiryType: 'message', message: { html: subject, md: comments }});
		
		console.log(the_message);
		
		the_message.save(function(err) {
            if(err) {
                console.log(err);
              } 
        });   

		async.series([
		
		function(next) {
								var email_options = {
																		templateName: 'contact',
																		templateExt: 'ejs',
																		templateEngine: require('ejs'),
																};
																
																console.log(JSON.stringify(email_options, null, 4));
																
																//next2();
																
																 new keystone.Email(email_options).send({
																	to: 'ramon.pena.rodriguez@gmail.com',
																	from: {
																		name: 'Codigo - No Reply',
																		email: 'no-reply@codigo.co.uk',
																	},
																	subject: subject,
																	email: email,
																	name: name,
																	comments: comments
																		
																}, next());
	   },
	   
	   ], function(err) {


		res.send('1');
		

		});
    
    	
    } else {
    	res.send('0');
    }

	
}
