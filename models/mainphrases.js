var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Mainphrase = new keystone.List('Mainphrase');

Mainphrase.add({
	image_src: { type: Types.CloudinaryImage, required: false },
	image_title: { type: String, required: true, initial: true },
	phrase_line_1: { type: String, required: true, initial: true },
	phrase_line_2: { type: String, required: true , initial: true }
	
});


Mainphrase.defaultColumns = 'phrase_line_1, phrase_line_2, image_title';
Mainphrase.register();
