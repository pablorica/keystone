var keystone = require('keystone'),


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'member';

	locals.data = {
		companies: []
	};
	
	view.on('init', function(next) {
		
		

		var q = keystone.list('Member').model.findOne({ slug: req.params.member }).sort( 'order');

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.member = results;
			console.log(results);
			//console.log('2: '+results); 
			//console.log(locals.data);
			next();
		});
		
		

	});
	
		
	view.render('member');
	
}
