var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'api_blog';
	
	console.log(JSON.stringify(req.body));
	
	locals.filters = {
		category: req.body.category
	};
	locals.data = {
		posts: [],
		categories: []
	};
	
	
	
	
	if (typeof req.body.page!='undefined' && req.body.page>0) {
		console.log('req.body.page: '+req.body.page);
	} else {
		console.log('no body page');
	}
	
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
		
		if (req.body.category) {
		
			//console.log("req.body.category: "+req.body.category);
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				//console.log("result: "+result);
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').paginate({
				page: req.body.page || 1,
 				perPage: 4,
 				maxPages: 1000
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');
		
		//console.log("locals.filters.category: "+locals.filters.category);
		
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	view.render(function(err) {
		if (err) {
			res.json({
	 			err: err
	 		});
	 	} else {
		 	//console.log(JSON.stringify(locals.data.posts, null, 4));
		 	res.json({
			 	posts: locals.data.posts
	 		});
	 	}
	});

	
}