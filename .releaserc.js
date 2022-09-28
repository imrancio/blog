// see https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration-file
module.exports = {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [{ type: 'post', release: 'patch' }],
			},
		],
		'@semantic-release/release-notes-generator',
		['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
		['@semantic-release/git', { assets: ['CHANGELOG.md', 'package.json'] }],
		// ['@semantic-release/github', { assets: [['path', '!**/*.map']] }],
	],
};
