var keystone = require('keystone');

var Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'api_sendmessage';
	
	var locals = res.locals;	
	
	var result='';

	console.log(req.body);
	
	
	view.on('init', function(next) {
		
		
		
		if (typeof req.body.name!='undefined' && req.body.name!='' &&
		    typeof req.body.email!='undefined' && req.body.email!='' &&
		    typeof req.body.message!='undefined' && req.body.message!='') {
			
			var enquire_temp={
				name: {
					   	first: req.body.name,
					   	last: ''
					   },
				email: req.body.email,
				enquiryType: 'message',
				message: { md: req.body.message }
			};
						
						
						
						var newEnquiry = new Enquiry.model(enquire_temp);
	    				newEnquiry.save(function(err, enquire) {
						    if (err) {
							    result=err;
								next(result);
						    } else {
							    //console.log(enquire);
							    result='ok';
                                return next();
						    }
						});

			    
		} else {
			
			console.log('ko');
			result='No params';
			next(result);
		}
		

	});


	view.render(function(err) {
		if (err) {
			res.json({
	 			result: err
	 		});
	 	} else {
		 	res.json({ result: result });
	 	}
	});

	
}