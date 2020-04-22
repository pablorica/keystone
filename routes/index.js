/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var _ = require('underscore'),
	keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);
	

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.initLingua);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.initPhoto);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/portfolio', routes.views.portfolio);
	app.get('/blog/:page?', routes.views.blog);
	app.get('/blog/category/:category/:page?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/team/:member', routes.views.member);
	app.all('/contact', routes.views.contact);
	app.all('/services', routes.views.services);
	app.post('/contactus', routes.views.contactus);
	app.get('/addresses', routes.views.addresses);
	app.get('/sitemap.xml', routes.views.sitemap);

	
	app.all('*', function(req, res, next) {
	  //res.set('Access-Control-Allow-Origin', 'http://localhost');
	  res.set('Access-Control-Allow-Origin', '*');
	  res.set('Access-Control-Allow-Credentials', true);
	  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT'); //this will be changed
	  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
	  if ('OPTIONS' == req.method) return res.send(200);
	  next();
	});
	
	app.get('/api/lingua/:iso_language', routes.views.api_lingua); //sample en_GB, es_ES, jp_JP
	app.get('/api/photos', routes.views.api_photo);
	app.get('/api/whatwedos', routes.views.api_whatwedos);
	app.get('/api/ourteam', routes.views.api_ourteam);
	app.post('/api/sendmessage', routes.views.api_sendmessage);
	app.post('/api/blog', routes.views.api_blog);
	app.get('/api/post/:slug', routes.views.api_post);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
}
