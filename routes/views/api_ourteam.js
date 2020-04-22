var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'api_ourteam';
	
	var locals = res.locals;	
	
	view.on('init', function(next) {

		var q = keystone.list('Member').model.find();

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.team = results;
			//console.log('2: '+results); 
			//console.log(locals.data.company);
			next();
		});
		
		

	});


	view.render(function(err) {
		if (err) {
			res.json({
	 			err: err
	 		});
	 	} else {
		 	res.json({ ourteam: locals.team });
	 	}
	});

	
}