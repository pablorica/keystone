var keystone = require('keystone'),
	Types = keystone.Field.Types;

var PostCategory = new keystone.List('PostCategory', {
	autokey: { path: 'slug', from: 'name', unique: true }
});

PostCategory.add({
	name: { type: String, required: true },
	slug: { type: String, index: true }
});

PostCategory.relationship({ ref: 'Post', path: 'categories' });

PostCategory.register();
