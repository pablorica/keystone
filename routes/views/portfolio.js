var keystone = require('keystone'),


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'portfolio';

	locals.data = {
		companies: []
	};
	
	locals.seo.title='Codigo | Portfolio';
	
	
	view.on('init', function(next) {
		
		

		var q = keystone.list('PortfolioType').model.find();

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			//console.log(results);
			locals.data.portfolio_types = results;
			//console.log('2: '+results); 
			//console.log(locals.data);
			next();
		});
		
		

	});
	
	
	view.on('init', function(next) {
		
		

		var q = keystone.list('Portfolio').model.find().populate('type');

		
			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			
			locals.data.portfolio = results;
			//console.log('2: '+results); 
			//console.log(locals.data);
			next();
		});
		
		

	});
	
		
	view.render('portfolio');
	
}
