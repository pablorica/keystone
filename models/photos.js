var keystone = require('keystone'),
	Types = keystone.Field.Types;

var photo = new keystone.List('photo');

photo.add({
	photoKey:  { type: String, required: true, initial: true },
	photoSrc: { type: Types.CloudinaryImage }
	
});


photo.defaultColumns = 'photoKey, photoSrc';
photo.register();
