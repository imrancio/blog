/* eslint-disable no-empty */
import { URL } from 'url';

import type { IEmbedStreamOptions, IStreamId } from '../interfaces';
import { urlProcessor } from './index';

function readSoundcloudEmbedURL(url: URL): IStreamId | Record<string, never> {
	const apiUrl = new URL(url.searchParams.get('url'));
	const pathSplit = apiUrl.pathname.split('/');
	if (pathSplit[1] === 'users') {
		if (pathSplit[3] === 'playlists') {
			return {
				id: pathSplit[4],
				service: 'soundcloud',
				type: 'playlist',
			};
		}

		if (pathSplit[3] === 'tracks') {
			return {
				id: pathSplit[4],
				service: 'soundcloud',
				type: 'track',
			};
		}
	}
	if (pathSplit[1] === 'tracks') {
		return {
			id: pathSplit[2],
			service: 'soundcloud',
			type: 'track',
		};
	}
	if (pathSplit[1] === 'playlists') {
		return {
			id: pathSplit[2],
			service: 'soundcloud',
			type: 'playlist',
		};
	}
	return {};
}

export function soundcloudProcessor(input: string): IStreamId | Record<string, never> {
	try {
		const url = new URL(input);
		if (url.origin === 'https://w.soundcloud.com') {
			return readSoundcloudEmbedURL(url);
		}
	} catch (e) {}

	return {};
}

export function soundcloudUrl(id: string, url: URL, options: IEmbedStreamOptions): URL {
	// soundcloud player attributes. See https://developers.soundcloud.com/docs/api/html5-widget
	const playerOptions = new Set([
		'autoplay',
		'auto_play',
		'buying',
		'color',
		'download',
		'hide_related',
		'rel',
		'sharing',
		'show_artwork',
		'show_playcount',
		'show_user',
		'show_comments',
		'show_user',
		'show_reposts',
		'show_teaser',
		'start_track',
		'url',
		'visual',
	]);
	const filter = ([option]: [string, string]) => playerOptions.has(option);
	const map = ([option, val]: [string, string]): [string, string] => {
		if (option === 'autoplay') {
			// embed urls use the auto_play keyword instead of 'autoplay'
			return ['auto_play', val];
		}
		if (option === 'rel') {
			return ['hide_related', val == '0' ? 'true' : 'false'];
		}
		return [option, val];
	};
	const concat: [string, string][] = !options.related ? [['hide_related', 'true']] : [];
	return urlProcessor(id, url, filter, map, concat);
}
