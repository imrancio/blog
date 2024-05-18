import plugin from 'remark-burger';
import visit from 'unist-util-visit';

import type { IEmbedStreamOptions, Node } from './interfaces';
import { defaultOptions, knownPlatforms } from './config';
import { embedStreamHTML } from './embed';
import { readTitle } from './utils';

const overrideDefaultOptions = (options: IEmbedStreamOptions): IEmbedStreamOptions => {
	const streamOptions = { ...defaultOptions, ...options };

	if (!streamOptions.height) {
		streamOptions.height = Math.round(streamOptions.width / streamOptions.ratio);
	}

	return streamOptions;
};

const addStreamIframe = ({ markdownAST }: never, options: IEmbedStreamOptions): void => {
	options = overrideDefaultOptions(options);

	const match = (node: Node, v: string): void => {
		const keywords = [...knownPlatforms(), 'video'].join('|');
		const re = new RegExp(`(${keywords}):(.*)`, 'i');

		const processValue = v.match(re);
		if (processValue) {
			const type = processValue[1];
			const { id, title } = readTitle(processValue[2].trim());
			options = { ...options, title };

			node.type = `html`;
			node.value = embedStreamHTML(type, id, options);
		}
	};

	const { beginMarker, endMarker } = options;
	if (beginMarker || endMarker) {
		visit(markdownAST, `embedStream`, (node: Node) => {
			const { data } = node;
			match(node, data.content);
		});
	} else {
		visit(markdownAST, `inlineCode`, (node: Node) => {
			const { value } = node;
			match(node, value);
		});
	}
};

const setParserPlugins = (options: IEmbedStreamOptions) => {
	options = overrideDefaultOptions(options);
	const { beginMarker, endMarker } = options;
	return [
		[
			plugin,
			{
				beginMarker,
				endMarker,
				onlyRunWithMarker: true,
				pattyName: 'embedStream',
			},
		],
	];
};

addStreamIframe.setParserPlugins = setParserPlugins;
export default addStreamIframe;
