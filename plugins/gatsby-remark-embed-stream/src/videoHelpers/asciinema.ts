/* eslint-disable no-empty */
import { URL } from 'url';

import type { IVideoId } from '../interfaces';

const readAsciinemaURL = (url: URL): IVideoId | Record<string, never> => {
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
};

export function asciinemaProcessor(input: string): IVideoId | Record<string, never> {
	try {
		const url = new URL(input);
		if (url.origin === 'https://asciinema.org') {
			return readAsciinemaURL(url);
		}
	} catch (e) {}

	return {};
}

export function asciinemaUrl(id: string, url: URL): URL {
	let newParameters: string[][] = [];
	if (id.startsWith('http')) {
		const originalParams = new URL(id);
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
		newParameters = [...originalParams.searchParams.entries()]
			.filter(([option]) => playerOptions.has(option))
			.map(([option, val]) => {
				if (option === 'start-at') {
					// embed urls use the t keyword instead of 'start-at'
					return ['t', val];
				}
				return [option, val];
			});
	}

	newParameters.forEach((val) => {
		url.searchParams.set(val[0], val[1]);
	});
	return url;
}
