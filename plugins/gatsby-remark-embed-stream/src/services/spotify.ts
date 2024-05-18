/* eslint-disable no-empty */
import { URL } from 'url';

import type { IStreamId, StreamType } from '../interfaces';
import { urlProcessor } from './index';

const spotifyTypes = new Set(['playlist', 'episode', 'track', 'artist', 'album']);

function readSpotifyEmbedURL(url: URL): IStreamId | Record<string, never> {
	const pathSplit = url.pathname.split('/');
	if (spotifyTypes.has(pathSplit[2])) {
		return {
			id: pathSplit[3],
			service: 'spotify',
			type: pathSplit[2] as StreamType,
		};
	}

	return {};
}

function readSpotifyURL(url: URL): IStreamId | Record<string, never> {
	const pathSplit = url.pathname.split('/');
	if (pathSplit[1] === 'user' && spotifyTypes.has(pathSplit[3])) {
		return {
			id: pathSplit[4],
			service: 'spotify',
			type: pathSplit[3] as StreamType,
		};
	}
	if (spotifyTypes.has(pathSplit[1])) {
		return {
			id: pathSplit[2],
			service: 'spotify',
			type: pathSplit[1] as StreamType,
		};
	}

	return {};
}

export function spotifyProcessor(input: string): IStreamId | Record<string, never> {
	try {
		const url = new URL(input);
		if (url.origin === 'https://open.spotify.com') {
			if (url.pathname.startsWith('/embed')) {
				return readSpotifyEmbedURL(url);
			}
			return readSpotifyURL(url);
		}
	} catch (e) {}

	return {};
}

export function spotifyUrl(id: string, url: URL): URL {
	// spotify player attributes. See https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
	const playerOptions = new Set(['t', 'theme']);
	const filter = ([option]: [string, string]) => playerOptions.has(option);
	return urlProcessor(id, url, filter);
}
