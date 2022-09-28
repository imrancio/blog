const { rules } = require('@commitlint/config-conventional');

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// allow 'post' type conventional commits
		'type-enum': [rules['type-enum'][0], rules['type-enum'][1], [...rules['type-enum'][2], 'post']],
	},
};
