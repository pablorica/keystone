/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	var date = new Date();
	locals.year = date.getFullYear();
	
	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
		{ label: 'Blog',		key: 'blog',		href: '/blog' },
		{ label: 'Contact',		key: 'contact',		href: '/contact' }
	];
	
	locals.user = req.user;
	
	locals.host='//'+req.headers.host+'';
	
	locals.seo = {};
	
	locals.seo.title='Codigo';
	
	locals.twitter = {
		enabled: 0,
		title: '',
		image: '',
		url: ''
	};
	
	locals.twitter.enabled=0;
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
}


exports.initLingua = function(req, res, next) {

		var locals = res.locals;
		
		locals.default_lang=keystone.get('default_lang');
		
		//console.log(locals.default_lang);

		var q = keystone.list('i18n').model.find( { language: locals.default_lang  } );

		var lingua = {};
	
		q.exec(function(err, results) {
			if (err) return res.err(err);
			for (var i=0;i<results.length;i++) {
			
				var temp=results[i].i18nKey;
				lingua[temp]=results[i].i18nString;
				
			}
			
			locals.lingua=lingua;
			
			next();
		});

	
};

exports.initPhoto = function(req, res, next) {

		var locals = res.locals;

		var photos = {};
	
		var q = keystone.list('photo').model.find();
	
		
		q.exec( function(err, results) {
				
			if (err) {
				next(err);
			} else {
				
				for (var i=0;i<results.length;i++) {
				
					var temp=results[i].photoKey;
					photos[temp]=results[i].photoSrc.secure_url;
					
				}
				
				//console.log(photos);
				
				locals.photo=photos;
				next();
			}
	
		});
};


