var keystone = require('keystone'),
	Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'services';

	locals.data = {
		companies: []
	};
	
	locals.seo.title='Codigo | Services';
	
	view.on('init', function(next) {

		var q = keystone.list('Whatwedo').model.find();

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.whatwedo = results;
			//console.log('2: '+results); 
			//console.log(locals.data);
			next();
		});
		
		

	});
	
		
	view.render('services');
	
}
