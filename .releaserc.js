// see https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration-file
module.exports = {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'conventionalcommits',
				releaseRules: [
					{ type: 'Blog', release: 'patch' },
					{ type: 'post', release: 'patch' },
				],
			},
		],
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		[
			'@semantic-release/npm',
			{
				npmPublish: false,
			},
		],
		[
			'@semantic-release/git',
			{
				assets: ['CHANGELOG.md', 'package.json', 'yarn.lock', 'npm-shrinkwrap.json'],
			},
		],
	],
};
