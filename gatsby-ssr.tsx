import { createElement } from 'react';
import type { GatsbySSR } from 'gatsby';

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
}) => {
	const script = createElement('script', {
		dangerouslySetInnerHTML: {
			__html: applyDarkModeClass,
		},
	});
	setPreBodyComponents([script]);
	setHtmlAttributes({ lang: 'en' });
};
