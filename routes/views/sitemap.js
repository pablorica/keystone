var keystone = require('keystone'),
    async = require('async');


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'sitemap';

		
	var error_message='';
	var error_code=null;
	var all_result=[];
	
	var urls=[];	

	async.series([
		
		function(next) {
		
			urls.push(
				{ loc: 'https:'+locals.host+'/services',  
				  changefreq: 'weekly', 
				  priority: 0.8 }
				);
				
			urls.push(
				{ loc: 'https:'+locals.host+'/portfolio',  
				  changefreq: 'weekly', 
				  priority: 0.8 }
				);
			urls.push(
				{ loc: 'https:'+locals.host+'/contact',  
				  changefreq: 'weekly', 
				  priority: 0.8 }
				);
			
			next();
		
		},

		function(next) {

			

			keystone.list('Member').model.find( {} ).sort('name').exec(function(err, member) {
			
						if (err) {
						
							error_message=err.message;
							error_code=2;
							return next();
							
						} else {
							
							//console.log(member);
							
							if (member.length>0) {
								//console.log(result.length);
								var i=0;
								member.forEach(function(user) {
									i++;
									
									urls.push(
										{ loc: 'https:'+locals.host+'/team/'+user.slug,  
										  changefreq: 'weekly', 
										  priority: 0.8 }
									);
									
									if (i===member.length) {
										return next();
									}
								});
								
							} else {
							
								console.log('Nothing to do here');
								return next();
							}
						}
			
			});

		}, 
		
		function(next) {
			
			keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next();
			} else {
				
					if (results.length>0) {
								//console.log(result.length);
								var i=0;
								results.forEach(function(post) {
									i++;
									
									urls.push(
										{ loc: 'https:'+locals.host+'/blog/category/'+post.slug,  
										  changefreq: 'weekly', 
										  priority: 0.8 }
									);
									
									if (i===results.length) {
										return next();
									}
								});
								
							} else {
							
								console.log('Nothing to do here');
								return next();
							}
				
			}
			
			
			});

	
				
		}, 
		
		function(next) {
			
			keystone.list('Post').model.find().sort('name').where('state', 'published').exec(function(err, results) {
			
			if (err || !results.length) {
				return next();
			} else {
				
					if (results.length>0) {
								//console.log(result.length);
								var i=0;
								results.forEach(function(post) {
									i++;
									
									urls.push(
										{ loc: 'https:'+locals.host+'/blog/post/'+post.slug,  
										  changefreq: 'weekly', 
										  priority: 0.8 }
									);
									
									if (i===results.length) {
										return next();
									}
								});
								
							} else {
							
								console.log('Nothing to do here');
								return next();
							}
				
			}
			
			
			});	
			
		}

	], function(err) {


		/*
		res.json(
		{"result": urls, "session_id": req.sessionID, "error_code": error_code, "error_message": error_message}
		);
		*/

		 var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
		 for (var i in urls) {
			xml += '<url>';
	        xml += '<loc>'+  urls[i].loc + '</loc>';
	        xml += '<changefreq>'+ urls[i].changefreq +'</changefreq>';
	        xml += '<priority>'+ urls[i].priority +'</priority>';
	        xml += '</url>';
	        i++;
	    }
		xml += '</urlset>';
		
		res.header('Content-Type', 'text/xml');
		res.send(xml);
		

	});
	
		

	
}
