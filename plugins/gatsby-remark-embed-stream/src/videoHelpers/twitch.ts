/* eslint-disable no-empty */
import { URL } from 'url';

import type { IVideoId } from '../interfaces';

const readTwitchURL = (url: URL): IVideoId | Record<string, never> => {
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
};

const readTwitchEmbedURL = (url: URL): IVideoId | Record<string, never> => {
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
};

const readTwitchClipURL = (url: URL): IVideoId | Record<string, never> => {
	const pathSplit = url.pathname.split('/');
	if (pathSplit[1]) {
		return {
			id: pathSplit[1],
			service: 'twitchClip',
		};
	}
};

function twitchUrlHelper(id: string, url: URL, playerOpts: string[]): URL {
	let newParameters: string[][] = [];
	if (id.startsWith('http')) {
		const originalParams = new URL(id);
		// twitch live/vod player attributes. See https://dev.twitch.tv/docs/embed/video-and-clips/#non-interactive-inline-frames-for-live-streams-and-vods
		const playerOptions = new Set(playerOpts);
		newParameters = [...originalParams.searchParams.entries()]
			.filter(([option]) => playerOptions.has(option))
			.map(([option, val]) => {
				if (option === 't') {
					// embed urls use the time keyword instead of 't'
					return ['time', val];
				}
				return [option, val];
			});
	}
	newParameters.forEach((val) => {
		url.searchParams.set(val[0], val[1]);
	});
	return url;
}

export function twitchUrl(id: string, url: URL): URL {
	// twitch live/vod player attributes. See https://dev.twitch.tv/docs/embed/video-and-clips/#non-interactive-inline-frames-for-live-streams-and-vods
	const playerOptions = ['autoplay', 'muted', 't', 'time'];
	return twitchUrlHelper(id, url, playerOptions);
}

export function twitchClipUrl(id: string, url: URL): URL {
	// twitch clips player attributes. See https://dev.twitch.tv/docs/embed/video-and-clips/#non-interactive-iframes-for-clips
	const playerOptions = ['autoplay', 'muted'];
	return twitchUrlHelper(id, url, playerOptions);
}

export function twitchIdProcessor(input: string): IVideoId | Record<string, never> {
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
