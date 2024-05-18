/* eslint-disable no-empty */
import { URL } from 'url';

import type { IStreamId } from '../interfaces';
import { urlProcessor } from './index';

function readAsciinemaURL(url: URL): IStreamId | Record<string, never> {
	const pathSplit = url.pathname.split('/');
	if (pathSplit[1] === 'a') {
		// strip any extensions from URL ID
		const id = pathSplit[2].replace(/\.[^/.]+$/, '');
		return {
			id,
			service: 'asciinema',
		};
	}

	return {};
}

export function asciinemaProcessor(input: string): IStreamId | Record<string, never> {
	try {
		const url = new URL(input);
		if (url.origin === 'https://asciinema.org') {
			return readAsciinemaURL(url);
		}
	} catch (e) {}

	return {};
}

export function asciinemaUrl(id: string, url: URL): URL {
	// asciinema player attributes. See https://docs.asciinema.org/manual/server/embedding/#start-at
	const playerOptions = new Set([
		'autoplay',
		'cols',
		'idle-time-limit',
		'loop',
		'poster',
		'preload',
		'row',
		'speed',
		'start-at',
		't',
		'theme',
	]);
	const filter = ([option]: [string, string]) => playerOptions.has(option);
	const map = ([option, val]: [string, string]): [string, string] => {
		if (option === 'start-at') {
			// embed urls use the t keyword instead of 'start-at'
			return ['t', val];
		}
		return [option, val];
	};
	return urlProcessor(id, url, filter, map);
}
