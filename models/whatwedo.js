var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Whatwedo = new keystone.List('Whatwedo');

Whatwedo.add({
	icon: { type: String, required: true, initial: true },
	icon2: { type: String, required: true, initial: true },
	title: { type: String, required: true, initial: true },
	content: { type: Types.Html, wysiwyg: false, height: 150 },
	isPublish: { type: Boolean, label: 'Publish' }
	
});


Whatwedo.defaultColumns = 'icon, title, content';
Whatwedo.register();
