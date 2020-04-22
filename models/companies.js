var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Company = new keystone.List('Company');

Company.add({
	title: { type: String, required: true, initial: true },
	target: { type: Number, required: true, initial: true },
	image: { type: Types.CloudinaryImage },
	alt: { type: String },
	mockup_image: { type: Types.CloudinaryImage },
	big_text: { type: Types.Textarea, heigh: 150 },
	description: { type: Types.Textarea, heigh: 150 },
	services: { type: Types.Relationship, ref: 'CompanyService', many: true },
	show: { type: Boolean, label: 'Show in frontend' },
	url: { type: String }
	
});


Company.defaultColumns = 'title, target, big_text, description, services';
Company.register();
