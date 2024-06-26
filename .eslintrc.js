module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.ts', '.tsx', '.js', '.jsx'],
			},
		},
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	plugins: ['@typescript-eslint', 'react'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
	},
	rules: {
		'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
		'@typescript-eslint/explicit-function-return-type': 'off',
		'react/no-unknown-property': ['error', { ignore: ['css'] }],
	},
	overrides: [
		// Override some TypeScript rules just for .js files
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
	ignorePatterns: ['dist/'],
};
