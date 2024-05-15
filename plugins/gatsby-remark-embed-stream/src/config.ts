import getVideoId from 'get-video-id';

import { youtubeUrl } from './videoHelpers/youtube';
import { twitchClipUrl, twitchIdProcessor, twitchUrl } from './videoHelpers/twitch';
import type { IVideoService, IVideoId, IEmbedVideoOptions, VideoType } from './interfaces';
import { nicoVideoProcessor } from './videoHelpers/nicovideo';
import { asciinemaProcessor, asciinemaUrl } from './videoHelpers/asciinema';

export const defaultOptions: IEmbedVideoOptions = {
	width: 560,
	ratio: 1.77,
	related: false,
	noIframeBorder: true,
	urlOverrides: [],
	containerClass: 'embedVideo-container',
	loadingStrategy: 'eager',
};

const parent = process.env.NODE_ENV === 'production' ? 'blog.imranc.io' : '127.0.0.1';

export const videoServicesConfig: IVideoService[] = [
	{
		id: 'youtube',
		embedUrl: (videoId: string) => `https://www.youtube.com/embed/${videoId}`,
		urlProcessing: youtubeUrl,
	},
	{
		id: 'vimeo',
		embedUrl: (videoId: string) => `https://player.vimeo.com/video/${videoId}`,
	},
	{
		id: 'videopress',
		embedUrl: (videoId: string) => `https://videopress.com/embed/${videoId}`,
		additionalHTML: '<script src="https://videopress.com/videopress-iframe.js"></script>',
	},
	{
		id: 'twitch',
		embedUrl: (videoId: string, type?: VideoType) =>
			type === 'video'
				? `https://player.twitch.tv/?autoplay=false&video=v${videoId}&parent=${parent}`
				: type === 'channel'
				? `https://player.twitch.tv/?channel=${videoId}&parent=${parent}`
				: type === 'collection'
				? `https://player.twitch.tv/?collection=${videoId}&parent=${parent}`
				: ``,
		urlProcessing: twitchUrl,
	},
	{
		id: 'twitchClip',
		embedUrl: (videoId: string) => `https://clips.twitch.tv/embed?clip=${videoId}&parent=${parent}`,
		urlProcessing: twitchClipUrl,
	},
	{
		id: 'niconico',
		embedUrl: (videoId: string) => `https://embed.nicovideo.jp/watch/${videoId}`,
	},
	{
		id: 'asciinema',
		embedUrl: (videoId: string) => `https://asciinema.org/a/${videoId}/iframe`,
		urlProcessing: asciinemaUrl,
	},
];

export const videoIdProcessors: ((id: string) => IVideoId | Record<string, never>)[] = [
	getVideoId,
	twitchIdProcessor,
	nicoVideoProcessor,
	asciinemaProcessor,
];

export const knownPlatforms = (): string[] => {
	return videoServicesConfig.map((val) => val.id);
};

export const getVideoService = (service: string, options: IEmbedVideoOptions): IVideoService => {
	const foundService = videoServicesConfig.find((val) => val.id === service);
	if (foundService) {
		if (options.urlOverrides) {
			const serviceOverride = options.urlOverrides.find((val) => val.id === service);
			if (serviceOverride) {
				foundService.embedUrl = serviceOverride.embedURL;
			}
		}
		return foundService;
	} else {
		throw Error('VideoService could not be found' + service);
	}
};
