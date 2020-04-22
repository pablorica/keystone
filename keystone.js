// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv')().load();

// Require keystone
var keystone = require('keystone');
var fs =require('fs');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	
	'name': 'Codigo',
	'brand': 'Codigo',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	
	'views': 'templates/views',
	'view engine': 'ejs',
	
	'auto update': true,
	
	'emails': 'templates/emails',
	'emails engine': 'ejs',
	
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'zT`9tC?Xp*bD&`W5/s0b~@&>ZgQ,&kJx8_/<KMTL,Q+1y^,@xmJr_~Ll[l!]S`_|',
	'port': 4004
	
});


// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('cloudinary config', 'cloudinary://915888127164149:CFsVUxbFvRxblGcgHX4yaHzqPEY@codigox' );


keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});


// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's

// default email templates, you may remove them if you're using your own.
// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
    
    'i18n': 'i18n',
    'photo': 'photo',
    'mainphrases': 'mainphrases',
    'whatwedos': 'whatwedos',
    'companies': ['companies', 'company-services'],
    'addresses': 'addresses',
    'members': 'members',
    'portfolios': ['portfolios', 'portfolio-types'],
	'posts': ['posts', 'post-categories'],
	'enquiries': 'enquiries',
	'users': 'users'
});

keystone.set('default_lang', 'en_UK');
//keystone.set('default_lang', 'es_ES');

//only for dev
// fs.writeFile(__dirname + '/start.log', 'started');

// Start Keystone to connect to your database and initialise the web server

keystone.start();
