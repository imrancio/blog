import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ThemeContext from './ThemeContext';

const REPO_QUERY = graphql`
	query Repo {
		site {
			siteMetadata {
				repo
			}
		}
	}
`;

const Comments = () => {
	const data = useStaticQuery(REPO_QUERY);
	const repo = data.site.siteMetadata.repo;
	const { theme } = useContext(ThemeContext);

	return (
		<section
			ref={(element) => {
				if (!element) return;
				const script = document.createElement('script');
				script.src = 'https://utteranc.es/client.js';
				script.async = true;
				script.setAttribute('repo', repo);
				script.setAttribute('issue-term', 'pathname');
				script.setAttribute('label', 'comment :speech_balloon:');
				script.setAttribute('theme', theme === 'dark' ? 'github-dark' : 'github-light');
				script.setAttribute('crossorigin', 'anonymous');
				element.replaceChildren(script);
			}}
		/>
	);
};

export default Comments;
