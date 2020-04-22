var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Member = new keystone.List('Member');

Member.add({
	name: { type: Types.Name, required: true },
	position: { type: String, required: true, initial: true },
	description: { type: Types.Html, wysiwyg: true, height: 150 },
	slug: { type: String, required: true, initial: true },
	//photo: { type: Types.LocalFile, dest: __dirname + './../public/images/team/' },
	photo: { type: Types.CloudinaryImage },
	big_photo: { type: Types.CloudinaryImage },
	facebook: { type: Types.Url },
	tumblr: { type: Types.Url },
	twitter: { type: Types.Url },
	linkedin: { type: Types.Url },
	dribbble: { type: Types.Url },
	google: { type: Types.Url },
	github: { type: Types.Url },
	order: { type: Number },
	show: { type: Boolean, label: 'Show in frontend' },
	
});


Member.defaultColumns = 'name, position, description';
Member.register();