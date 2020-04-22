var keystone = require('keystone'),
	async = require('async');
	
var moment = require('moment');
	
var util=require('util');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	
	console.log("req.params:" + util.inspect(req.params));
	
	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		posts: [],
		categories: []
	};
	
	locals.seo.title='Codigo | Blog';
	
	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.categories = results;
			
			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {
				
				keystone.list('Post').model.count().where('category').in([category.id]).exec(function(err, count) {
					category.postCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.category) {
		
			console.log("req.params.category: "+req.params.category);
			keystone.list('PostCategory').model.findOne({ slug: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				console.log("result: "+result);
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').paginate({
				page: req.params.page || 1,
 				perPage: 3,
 				maxPages: 100
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');
		
		console.log("locals.filters.category: "+locals.filters.category);
		
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}
		
		q.exec(function(err, posts) {
			
			if (posts) {
				
				locals.data.posts = posts;	
				
				next();
							
			} else {
				next();
			}			
				
		});
		
	});
	
	// Render the view
	view.render('blog', { moment: moment });
	//view.json(JSON.stringify(locals.data.posts, null, 4));
	
	/*
	view.render(function(err) {
		//if (err) return res.apiError('error', err);
		if (err) {
			res.json({
	 			err: err
	 		});
	 	} else {
		 	res.json({
	 			posts: locals.data.posts
	 		});
	 	}
	});
	*/
 
	
	
}
