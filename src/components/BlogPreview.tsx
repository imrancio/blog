import React from 'react';
import { Link } from 'gatsby';
import { Highlight, Snippet } from 'react-instantsearch-hooks-web';
import BlogInfo from './BlogInfo';
import { rhythm } from '../utils/typography';

const BlogPreview = ({ hit }) => {
	return (
		<div key={hit.slug}>
			<BlogInfo timeToRead={hit.timeToRead} date={hit.date} />
			<h3
				css={{
					marginTop: rhythm(1 / 4),
					marginBottom: rhythm(0.5),
				}}
			>
				<Link style={{ boxShadow: `none` }} to={hit.slug}>
					<Highlight hit={hit} attribute="title" highlightedTagName="mark" />
				</Link>
			</h3>
			<p css={{ marginBottom: rhythm(1) }}>
				{hit._highlightResult.description.matchLevel === 'none' ? (
					<Snippet hit={hit} attribute="excerpt" highlightedTagName="mark" />
				) : (
					<Highlight hit={hit} attribute="description" highlightedTagName="mark" />
				)}
			</p>
		</div>
	);
};

export default BlogPreview;
