import React, { createElement } from 'react';
import type { GatsbySSR } from 'gatsby';
import { Partytown } from '@builder.io/partytown/react';

const GTAG_ORIGIN = 'https://www.googletagmanager.com';

const applyDarkModeClass = `
(function() {
  try {
    var mode = localStorage.getItem('theme');
    if (mode === 'dark') {
			document.body.classList.add('dark');
		}
  } catch (e) {}
})();
`;

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
	setPreBodyComponents,
	setHtmlAttributes,
	setHeadComponents,
}) => {
	const script = createElement('script', {
		dangerouslySetInnerHTML: {
			__html: applyDarkModeClass,
		},
	});
	setPreBodyComponents([script]);
	setHtmlAttributes({ lang: 'en' });

	if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') return null;
	setHeadComponents([
		<Partytown key="partytown" forward={['gtag']} />,
		<script
			key="google-analytics"
			type="text/partytown"
			src={`${GTAG_ORIGIN}/gtag/js?id=${process.env.GATSBY_GA_MEASUREMENT_ID}`}
		/>,
		<script
			key="google-analytics-config"
			type="text/partytown"
			dangerouslySetInnerHTML={{
				__html: `window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){ window.dataLayer.push(arguments);}
        gtag('js', new Date()); 
        gtag('config', '${process.env.GATSBY_GA_MEASUREMENT_ID}', { send_page_view: false })`,
			}}
		/>,
	]);
};
