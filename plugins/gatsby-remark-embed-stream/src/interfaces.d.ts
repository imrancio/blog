import { URL } from 'url';
import { RemarkBurgerOptions } from 'remark-burger';

interface Node {
	type: string;
	value: string;
	data: { content: string };
}

interface IEmbedStreamOptions extends RemarkBurgerOptions {
	width: number;
	ratio: number;
	related?: boolean;
	height?: number;
	noIframeBorder?: boolean;
	urlOverrides?: {
		id: string;
		embedURL: (videoId: string) => string;
	}[];
	beginMarker?: string;
	endMarker?: string;
	title?: string;
	containerClass?: string;
	iframeId?: boolean;
	loadingStrategy?: string;
	sandbox?: string;
}

type StreamType =
	| 'video'
	| 'channel'
	| 'collection'
	| 'playlist'
	| 'episode'
	| 'track'
	| 'artist'
	| 'album';

interface IStreamId {
	id: string;
	service: string;
	type?: StreamType;
}

interface IStreamService {
	id: string;
	embedUrl: (val: string, type?: StreamType) => string;
	urlProcessing?: (originalUrl: string, embedUrl: URL, options?: IEmbedStreamOptions) => URL;
	additionalHTML?: string;
}
