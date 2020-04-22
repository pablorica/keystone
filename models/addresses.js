var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Address = new keystone.List('Address');

Address.add({
	title: { type: String, required: true, initial: true },
	alt: { type: String },
	mockup_image: { type: Types.CloudinaryImage },
	big_text: { type: Types.Textarea, heigh: 150 },
	description: { type: Types.Textarea, heigh: 150 },
	services: { type: Types.Relationship, ref: 'CompanyService', many: true },
	show: { type: Boolean, label: 'Show in frontend' },
	url: { type: String }
	
});


Address.defaultColumns = 'title, target, big_text, description, services';
Address.register();
