var keystone = require('keystone'),
	Types = keystone.Field.Types;

var PortfolioType = new keystone.List('PortfolioType', {
	autokey: { from: 'name', path: 'key' }
});

PortfolioType.add({
	name: { type: String, required: true }
});

PortfolioType.relationship({ ref: 'Portfolio', path: 'type' });

PortfolioType.register();