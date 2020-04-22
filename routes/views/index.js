var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
		
		
	
	// Set locals
	locals.section = 'home';
	
	locals.data = {
		companies: []
	};
	
	//Company.model.find()
    //.exec(function(err, companies) {
    //    locals.companies=companies;
    //});
	
	view.on('init', function(next) {

		var q = keystone.list('Company').model.find().populate('services');

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.company = results;
			//console.log('2: '+results); 
			//console.log(locals.data.company);
			next();
		});
		
		

	});
	
	
	view.on('init', function(next) {

		var q = keystone.list('Member').model.find({ show: true }).sort( 'order');

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.team = results;
			//console.log('2: '+results); 
			//console.log(locals.data.company);
			next();
		});
		
		

	});
	
	
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
	
	view.on('init', function(next) {

		var q = keystone.list('PortfolioType').model.find();

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.portfolio_tags = results;
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
			//console.log(locals.data.portfolio);
			next();

		});
		
		

	});
	
	view.on('init', function(next) {

		var q = keystone.list('Mainphrase').model.find();

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.mainphrase = results;
			//console.log(locals.data.mainphrase);
			next();

		});
		
		

	});
	
	
	
	
	
	//view.render('index');
	view.render('indexaxis');
	
}
