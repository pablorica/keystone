var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'api_whatwedos';
	
	var locals = res.locals;	
	
	view.on('init', function(next) {

		var q = keystone.list('Whatwedo').model.find( { isPublish: true } );

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.whatwedo = results;
			//console.log('2: '+results); 
			//console.log(locals.data);
			next();
		});
		
		

	});


	view.render(function(err) {
		if (err) {
			res.json({
	 			err: err
	 		});
	 	} else {
		 	res.json({ whatwedos: locals.whatwedo });
	 	}
	});

	
}