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

		var q = keystone.list('Company').model.find();

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.companies = results;
			//console.log('2: '+results); 
			//console.log(locals.data);
			next();
		});
		
		

	});
	
	view.render('index');
	
}
