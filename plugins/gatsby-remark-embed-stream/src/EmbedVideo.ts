import { URL } from 'url';

import { getVideoService, videoIdProcessors } from './config';
import type { IEmbedVideoOptions, IVideoId, IVideoService, VideoType } from './interfaces';

export function embedVideoHTML(type: string, id: string, options: IEmbedVideoOptions): string {
	try {
		const videoId: IVideoId = readVideoId(type, id);
		const videoService = getVideoService(videoId.service, options);
		const url = createUrl(videoId.id, id, videoService, options, videoId.type);
		const iframe = createIframe(videoId.id, url, id, videoService, options);
		return iframe;
	} catch (e) {
		return `<p style="color: red">Error: ${(e as Error).message}</p>`;
	}
}

export function readVideoId(type: string, id: string): IVideoId {
	let videoId: IVideoId | Record<string, never>;
	for (const processor of videoIdProcessors) {
		try {
			videoId = processor(id);
		} catch (e) {
			videoId = {};
		}

		if (Object.keys(videoId).length !== 0 && (videoId as IVideoId).id !== null) {
			return videoId as IVideoId;
		}
	}

	if (type === 'video') {
		throw new TypeError('Id could not be processed');
	}

	return {
		id: id,
		service: type.toLowerCase(),
	};
}

function createUrl(
	videoId: string,
	originalUrl: string,
	videoService: IVideoService,
	options?: IEmbedVideoOptions,
	type?: VideoType,
): string {
	const videoUrl = videoService.embedUrl(videoId, type);
	let embedUrl = new URL(videoUrl);
	if (videoService.urlProcessing) {
		embedUrl = videoService.urlProcessing(originalUrl, embedUrl, options);
	}

	return embedUrl.toString();
}

function createIframe(
	videoId: string,
	url: string,
	id: string,
	videoService: IVideoService,
	options: IEmbedVideoOptions,
) {
	const { title = '', width, height, containerClass, loadingStrategy } = options;
	let iframeNode;
	switch (videoService.id) {
		case 'asciinema':
			// NOTE: asciinema iframe color-scheme must be light or gets white background in dark mode
			iframeNode = `
			<div
			  id="asciicast-container-${videoId}"
			  class="asciicast"
			  style="padding-bottom:${
					new URL(id).searchParams.get('height') ?? options.height
				}%; position:relative; display:block; width:100%; margin-bottom:0"
			>
				<iframe
					id="asciicast-iframe-${videoId}"
					name="asciicast-iframe-${videoId}"
					src="${url}"
					loading="${loadingStrategy}"
					scrolling="no"
					allowfullscreen="true"
					width="100%"
					height="100%"
					frameborder="0"
					style="position:absolute; top:0; left:0; color-scheme:light"
				></iframe>
			</div>`;
			break;
		default:
			iframeNode = `
      <div class="${containerClass}">
        <iframe
          title="${title}"
          width="${width}"
          height="${height}"
          src="${url}"
          class="embedVideo-iframe"
          ${options.noIframeBorder ? 'style="border:0"' : ''}
          ${options.iframeId ? `id="${id}"` : ''}
          ${options.sandbox ? `sandbox=${options.sandbox}` : ''}
          loading="${loadingStrategy}"
          allowfullscreen
          sandbox="allow-same-origin allow-scripts allow-popups"
        ></iframe>
      </div>`;
	}

	if (videoService.additionalHTML) {
		iframeNode += videoService.additionalHTML;
	}

	return iframeNode;
}
