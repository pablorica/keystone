var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'api_post';
	
	console.log(req.params);
	
	//console.log(JSON.stringify(req, null, 4));
	
	locals.data = {
		post: {}
	};
	
	// Load the post
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: req.params.slug
		}).populate('author categories');
		
		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});
		
	});
	
	view.render(function(err) {
		if (err) {
			res.json({
	 			err: err
	 		});
	 	} else {
		 	console.log(JSON.stringify(locals.data.post, null, 4));
		 	res.json({
			 	post_data: locals.data.post
	 		});
	 	}
	});

	
}