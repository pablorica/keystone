var keystone = require('keystone'),
	Types = keystone.Field.Types;

var i18n = new keystone.List('i18n');

i18n.add({
	language: { type: Types.Select, options: 'en_UK, es_ES, ja_JP', initial: true},
	i18nKey:  { type: String, required: true, initial: true },
	i18nString: { type: String }
	
});


i18n.defaultColumns = 'language, i18nKey, i18nString';
i18n.register();
