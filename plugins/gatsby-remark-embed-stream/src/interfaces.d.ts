import { URL } from 'url';
import { RemarkBurgerOptions } from 'remark-burger';

interface Node {
	type: string;
	value: string;
	data: { content: string };
}

interface IEmbedVideoOptions extends RemarkBurgerOptions {
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

type VideoType = 'video' | 'channel' | 'collection';

interface IVideoId {
	id: string;
	service: string;
	type?: VideoType;
}

interface IVideoService {
	id: string;
	embedUrl: (val: string, type?: VideoType) => string;
	urlProcessing?: (originalUrl: string, embedUrl: URL, options?: IEmbedVideoOptions) => URL;
	additionalHTML?: string;
}
