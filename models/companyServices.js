var keystone = require('keystone'),
	Types = keystone.Field.Types;

var CompanyService = new keystone.List('CompanyService', {
	autokey: { from: 'name', path: 'key' }
});

CompanyService.add({
	name: { type: String, required: true }
});

CompanyService.relationship({ ref: 'Company', path: 'services' });

CompanyService.register();