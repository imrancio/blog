import getVideoId from 'get-video-id';

import { youtubeUrl } from './services/youtube';
import { twitchClipUrl, twitchIdProcessor, twitchUrl } from './services/twitch';
import type { IStreamService, IStreamId, IEmbedStreamOptions, StreamType } from './interfaces';
import { nicoVideoProcessor } from './services/nicovideo';
import { asciinemaProcessor, asciinemaUrl } from './services/asciinema';
import { spotifyProcessor, spotifyUrl } from './services/spotify';
import { soundcloudProcessor, soundcloudUrl } from './services/soundcloud';

export const defaultOptions: IEmbedStreamOptions = {
	width: 560,
	ratio: 1.77,
	related: false,
	noIframeBorder: true,
	urlOverrides: [],
	containerClass: 'embedStream-container',
	loadingStrategy: 'eager',
};

const parent = process.env.NODE_ENV === 'production' ? 'blog.imranc.io' : '127.0.0.1';

export const streamServicesConfig: IStreamService[] = [
	{
		id: 'youtube',
		embedUrl: (streamId: string) => `https://www.youtube.com/embed/${streamId}`,
		urlProcessing: youtubeUrl,
	},
	{
		id: 'vimeo',
		embedUrl: (streamId: string) => `https://player.vimeo.com/video/${streamId}`,
	},
	{
		id: 'videopress',
		embedUrl: (streamId: string) => `https://videopress.com/embed/${streamId}`,
		additionalHTML: '<script src="https://videopress.com/videopress-iframe.js"></script>',
	},
	{
		id: 'twitch',
		embedUrl: (streamId: string, type?: StreamType) =>
			type === 'video'
				? `https://player.twitch.tv/?autoplay=false&video=v${streamId}&parent=${parent}`
				: `https://player.twitch.tv/?${type}=${streamId}&parent=${parent}`,
		urlProcessing: twitchUrl,
	},
	{
		id: 'twitchClip',
		embedUrl: (streamId: string) =>
			`https://clips.twitch.tv/embed?clip=${streamId}&parent=${parent}`,
		urlProcessing: twitchClipUrl,
	},
	{
		id: 'niconico',
		embedUrl: (streamId: string) => `https://embed.nicovideo.jp/watch/${streamId}`,
	},
	{
		id: 'asciinema',
		embedUrl: (streamId: string) => `https://asciinema.org/a/${streamId}/iframe`,
		urlProcessing: asciinemaUrl,
	},
	{
		id: 'spotify',
		embedUrl: (streamId: string, type: StreamType) =>
			`https://open.spotify.com/embed/${type}/${streamId}`,
		urlProcessing: spotifyUrl,
		additionalHTML: `<script src="https://open.spotify.com/embed/iframe-api/v1" async></script>`,
	},
	{
		id: 'soundcloud',
		embedUrl: (streamId: string, streamType: StreamType) =>
			`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${streamType}s/${streamId}`,
		urlProcessing: soundcloudUrl,
	},
];

export const streamIdProcessors: ((id: string) => IStreamId | Record<string, never>)[] = [
	getVideoId,
	twitchIdProcessor,
	nicoVideoProcessor,
	asciinemaProcessor,
	spotifyProcessor,
	soundcloudProcessor,
];

export const knownPlatforms = (): string[] => {
	return streamServicesConfig.map((val) => val.id);
};

export const getStreamService = (service: string, options: IEmbedStreamOptions): IStreamService => {
	const foundService = streamServicesConfig.find((val) => val.id === service);
	if (foundService) {
		if (options.urlOverrides) {
			const serviceOverride = options.urlOverrides.find((val) => val.id === service);
			if (serviceOverride) {
				foundService.embedUrl = serviceOverride.embedURL;
			}
		}
		return foundService;
	} else {
		throw Error('StreamService could not be found' + service);
	}
};
