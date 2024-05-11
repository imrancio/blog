import { UserConfig, RuleConfigSeverity } from '@commitlint/types';

const Config: UserConfig = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// allow 'post' type conventional commits
		'type-enum': [RuleConfigSeverity.Error, 'always', [
			'build',
			'chore',
			'ci',
			'docs',
			'feat',
			'fix',
			'perf',
			'post',
			'refactor',
			'revert',
			'style',
			'test'
		]],
	},
};

export default Config;
