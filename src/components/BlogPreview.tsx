import React from 'react';
import { Link } from 'gatsby';
import { Highlight, Snippet } from 'react-instantsearch';
import type { Hit } from 'instantsearch.js';
import type { SendEventForHits } from 'instantsearch.js/es/lib/utils';

import BlogInfo from './BlogInfo';
import { rhythm } from '../utils/typography';

/** see [gatsby-plugin-algolia](../../gatsby-config.ts) transformer output */
export type BaseHit = {
	id: string;
	slug: string;
	date: string;
	title: string;
	description: string;
	excerpt: string;
	timeToRead: number;
};

type BlogPreviewProps = {
	hit: Hit<BaseHit>;
	sendEvent: SendEventForHits;
};

const BlogPreview = ({ hit }: BlogPreviewProps) => {
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
				{!Array.isArray(hit._highlightResult.description) &&
				hit._highlightResult.description.matchLevel === 'none' ? (
					<Snippet hit={hit} attribute="excerpt" highlightedTagName="mark" />
				) : (
					<Highlight hit={hit} attribute="description" highlightedTagName="mark" />
				)}
			</p>
		</div>
	);
};

export default BlogPreview;
