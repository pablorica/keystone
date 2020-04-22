var keystone = require('keystone'),
	Address = keystone.list('Address');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'addresses';

	locals.data = {

	};
	
	view.on('init', function(next) {

		var q = Address.model.find();

			
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.number=results.length;
			locals.data.address = results;
			//console.log('2: '+results); 
			//console.log(locals.data);
			next();
		});
		
		

	});
	
		
	view.render('addresses');
	
}
