import { URL } from 'url';

import { getStreamService, streamIdProcessors } from './config';
import type { IEmbedStreamOptions, IStreamId, IStreamService, StreamType } from './interfaces';

export function embedStreamHTML(type: string, id: string, options: IEmbedStreamOptions): string {
	try {
		const streamId: IStreamId = readStreamId(type, id);
		const streamService = getStreamService(streamId.service, options);
		const url = createUrl(streamId.id, id, streamService, options, streamId.type);
		const iframe = createIframe(url, id, streamService, options);
		return iframe;
	} catch (e) {
		return `<p style="color: red">Error: ${(e as Error).message}</p>`;
	}
}

export function readStreamId(type: string, id: string): IStreamId {
	let streamId: IStreamId | Record<string, never>;
	for (const processor of streamIdProcessors) {
		try {
			streamId = processor(id);
		} catch (e) {
			streamId = {};
		}

		if (Object.keys(streamId).length !== 0 && (streamId as IStreamId).id !== null) {
			return streamId as IStreamId;
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
	streamId: string,
	originalUrl: string,
	streamService: IStreamService,
	options?: IEmbedStreamOptions,
	type?: StreamType,
): string {
	const streamUrl = streamService.embedUrl(streamId, type);
	let embedUrl = new URL(streamUrl);
	if (streamService.urlProcessing) {
		embedUrl = streamService.urlProcessing(originalUrl, embedUrl, options);
	}

	return embedUrl.toString();
}

function createIframe(
	url: string,
	id: string,
	streamService: IStreamService,
	options: IEmbedStreamOptions,
) {
	const { title = '', width, height, containerClass, loadingStrategy } = options;
	let iframeNode, queryHeight, queryWidth;
	try {
		queryHeight = new URL(id).searchParams.get('height');
		queryWidth = new URL(id).searchParams.get('width');
	} catch (e) {
		queryHeight = queryWidth = undefined;
	}
	// NOTE: iframe color-scheme must be light or some embeds get white background in dark mode
	iframeNode = `
		<div class="${containerClass}">
			<iframe
				title="${title}"
				width="${queryWidth ?? width}"
				height="${queryHeight ?? height}"
				src="${url}"
				class="embedStream-iframe"
				${options.noIframeBorder ? 'frameborder="0"' : ''}
				${options.iframeId ? `id="${id}"` : ''}
				loading="${loadingStrategy}"
				allowfullscreen
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				sandbox="${options.sandbox ?? 'allow-same-origin allow-scripts allow-popups'}"
				scrolling="no"
				style="color-scheme:light"
			></iframe>
		</div>`;

	if (streamService.additionalHTML) {
		iframeNode += streamService.additionalHTML;
	}

	return iframeNode;
}
