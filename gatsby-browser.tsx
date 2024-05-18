// global styles
import './src/styles/global.css';
// custom typefaces
import '@fontsource/open-sans';
import '@fontsource/open-sans/700.css';
import '@fontsource/zilla-slab';
import '@fontsource/zilla-slab/700.css';
import '@fontsource/cascadia-code';
import 'instantsearch.css/themes/satellite.css';
import './src/styles/instantsearch-theme-overrides.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/command-line/prism-command-line.css';

import type { GatsbyBrowser } from 'gatsby';

/**
 * @type {GatsbyBrowser['onRouteUpdate']}
 */
export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({ location }) => {
	if (process.env.NODE_ENV !== 'production') {
		return null;
	}

	const pagePath = location ? location.pathname + location.search + location.hash : undefined;
	setTimeout(() => {
		if (typeof gtag === 'function') {
			gtag('event', 'page_view', { page_path: pagePath });
		}
	}, 100);
};
