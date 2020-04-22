var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	
	//console.log(req.params.iso_language);
	
	
	var get_global_lingua=keystone.get('default_lang');
	
	if (typeof req.params.iso_language!='undefined' && req.params.iso_language!='' ) {
		get_global_lingua=req.params.iso_language;
	}
	
	//console.log(get_global_lingua);
	
	// Set locals
	locals.section = 'api_lingua';
	
	var locals = res.locals;
	
	var q = keystone.list('i18n').model.find( { language: get_global_lingua  } );

	var lingua = {};
	
	
	view.on('init', function(next) {
		
		q.exec( function(err, results) {
				
			if (err) {
				next(err);
			} else {
			
			
			for (var i=0;i<results.length;i++) {
				
					var temp=results[i].i18nKey;
					lingua[temp]=results[i].i18nString;
					
				}
				
				locals.lingua=lingua;
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
			 	lingua:
	 			locals.lingua
	 		});
	 	}
	});

	
}