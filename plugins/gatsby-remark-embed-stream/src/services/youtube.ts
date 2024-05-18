import { URL } from 'url';

import type { IEmbedStreamOptions } from '../interfaces';
import { urlProcessor } from './index';

export function youtubeUrl(id: string, url: URL, options: IEmbedStreamOptions): URL {
	// see https://developers.google.com/youtube/player_parameters
	const playerOptions = new Set([
		'autoplay',
		'cc_lang_pref',
		'cc_load_policy',
		'color',
		'controls',
		'disablekb',
		'enablejsapi',
		'end',
		'fs',
		'hl',
		'iv_load_policy',
		'loop',
		'origin',
		'playlist',
		'playsinline',
		'rel',
		'start',
		't',
		'widget_referrer',
		//Skip original v Parameter
	]);
	const filter = ([option]: [string, string]) => playerOptions.has(option);
	const map = ([option, val]: [string, string]): [string, string] => {
		if (option === 't') {
			// embed urls use the start keyword instead of 't'
			return ['start', val];
		}
		return [option, val];
	};
	const concat: [string, string][] = !options.related ? [['rel', '0']] : [];
	return urlProcessor(id, url, filter, map, concat);
}
