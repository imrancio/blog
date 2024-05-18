/* eslint-disable no-empty */
import { URL } from 'url';

import type { IStreamId } from '../interfaces';

export function nicoVideoProcessor(input: string): IStreamId | Record<string, never> {
	try {
		const url = new URL(input);
		if (url.hostname.includes('nicovideo')) {
			const pathSplit = url.pathname.split('/');
			if (pathSplit.length >= 3) {
				return {
					id: pathSplit[2],
					service: 'niconico',
				};
			}
		}
	} catch (e) {}

	return {};
}
