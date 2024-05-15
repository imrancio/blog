import { URL } from 'url';

import type { IEmbedVideoOptions } from '../interfaces';

export function youtubeUrl(id: string, url: URL, options: IEmbedVideoOptions): URL {
	let newParameters: string[][] = [];
	if (id.startsWith('http')) {
		const originalParams = new URL(id);
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
		newParameters = [...originalParams.searchParams.entries()]
			.filter(([option]) => playerOptions.has(option))
			.map(([option, val]) => {
				if (option === 't') {
					// embed urls use the start keyword instead of 't'
					return ['start', val];
				}
				return [option, val];
			});
	}

	if (!options.related) {
		newParameters.push(['rel', '0']);
	}

	newParameters.forEach((val) => {
		url.searchParams.set(val[0], val[1]);
	});
	return url;
}
