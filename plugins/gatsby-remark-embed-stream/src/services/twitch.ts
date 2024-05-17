/* eslint-disable no-empty */
import { URL } from 'url';

import type { IStreamId } from '../interfaces';
import { urlProcessor } from './index';

function readTwitchURL(url: URL): IStreamId | Record<string, never> {
	const pathSplit = url.pathname.split('/');
	if (pathSplit[2] === 'clip') {
		return {
			id: pathSplit[3],
			service: 'twitchClip',
		};
	}
	if (pathSplit[1] === 'videos') {
		return {
			id: pathSplit[2],
			service: 'twitch',
			type: 'video',
		};
	}
	if (pathSplit[1]) {
		return {
			id: pathSplit[1],
			service: 'twitch',
			type: 'channel',
		};
	}

	return {};
}

function readTwitchEmbedURL(url: URL): IStreamId | Record<string, never> {
	const videoId = url.searchParams.get('video');
	const channelId = url.searchParams.get('channel');
	const collectionId = url.searchParams.get('collection');
	const service = 'twitch';

	if (videoId) {
		return {
			id: videoId,
			service,
			type: 'video',
		};
	}

	if (channelId) {
		return {
			id: channelId,
			service,
			type: 'channel',
		};
	}

	if (collectionId) {
		return {
			id: collectionId,
			service,
			type: 'collection',
		};
	}
	return {};
}

function readTwitchClipURL(url: URL): IStreamId | Record<string, never> {
	const pathSplit = url.pathname.split('/');
	if (pathSplit[1]) {
		return {
			id: pathSplit[1],
			service: 'twitchClip',
		};
	}
}

const map = ([option, val]: [string, string]): [string, string] => {
	if (option === 't') {
		// embed urls use the time keyword instead of 't'
		return ['time', val];
	}
	return [option, val];
};

export function twitchUrl(id: string, url: URL): URL {
	// twitch live/vod player attributes. See https://dev.twitch.tv/docs/embed/video-and-clips/#non-interactive-inline-frames-for-live-streams-and-vods
	const playerOptions = new Set(['autoplay', 'muted', 't', 'time']);
	const filter = ([option]: [string, string]) => playerOptions.has(option);
	return urlProcessor(id, url, filter, map);
}

export function twitchClipUrl(id: string, url: URL): URL {
	// twitch clips player attributes. See https://dev.twitch.tv/docs/embed/video-and-clips/#non-interactive-iframes-for-clips
	const playerOptions = new Set(['autoplay', 'muted']);
	const filter = ([option]: [string, string]) => playerOptions.has(option);
	return urlProcessor(id, url, filter, map);
}

export function twitchIdProcessor(input: string): IStreamId | Record<string, never> {
	try {
		const url = new URL(input);
		if (url.origin === 'https://www.twitch.tv') {
			return readTwitchURL(url);
		}
		if (url.origin === 'https://player.twitch.tv') {
			return readTwitchEmbedURL(url);
		}
		if (url.origin === 'https://clips.twitch.tv') {
			return readTwitchClipURL(url);
		}
	} catch (e) {}
	return {};
}
