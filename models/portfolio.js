var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Portfolio = new keystone.List('Portfolio');

Portfolio.add({

	title: { type: String, required: true, initial: true },
	subtitle: { type: String, required: true, initial: false },
	target: { type: Number, required: true, initial: true },
	image_big: { type: Types.CloudinaryImage },
	image_tn: { type: Types.CloudinaryImage },
	image_display: {type: Types.Select, options: 'big-h, big-w, none', default: 'none', index: true },
	url: { type: Types.Url },
	type: { type: Types.Relationship, ref: 'PortfolioType', many: false }
	
});

Portfolio.defaultColumns = 'title, id, type';
Portfolio.register();