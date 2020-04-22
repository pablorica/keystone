var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'api_photo';
	
	var locals = res.locals;
	
	var photos = {};
	
	var q = keystone.list('photo').model.find();
	
	view.on('init', function(next) {
		
		q.exec( function(err, results) {
				
			if (err) {
				next(err);
			} else {
				
				for (var i=0;i<results.length;i++) {
				
					var temp=results[i].photoKey;
					photos[temp]=results[i].photoSrc.secure_url;
					
				}
				
				locals.photos=photos;
				next();
			}
	
		});
	});

	view.render(function(err) {
		if (err) {
			res.json({
	 			err: err
	 		});
	 	} else {
		 	res.json({
			 	photo:
	 			locals.photos
	 		});
	 	}
	});

	
}