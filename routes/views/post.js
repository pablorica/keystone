var keystone = require('keystone'),
	async = require('async');
	
var moment = require('moment');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};
	
	// Load the current post
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories');
		
		q.exec(function(err, result) {
			locals.data.post = result;
			locals.seo.title='Codigo | '+result.title;
			locals.twitter = {
				enabled: 1,
				title: result.title,
				image: result.image.secure_url,
				url: 'https://'+req.headers.host+'/blog/post/'+result.slug
			};
			next(err);
		});
		
	});
	
	// Load other posts
	
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	// Render the view

	view.render('post', { moment: moment });
	/*
	view.render(function(err) {
		//if (err) return res.apiError('error', err);
		if (err) {
			res.json({
	 			err: err
	 		});
	 	} else {
		 	res.json({
	 			posts: locals.data.post
	 		});
	 	}
	});
	*/
	
}
