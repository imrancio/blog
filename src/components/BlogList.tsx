import React from 'react';
import { Link } from 'gatsby';
import { Hits, useInstantSearch } from 'react-instantsearch-hooks-web';
import BlogInfo from './BlogInfo';
import BlogPreview from './BlogPreview';
import { rhythm } from '../utils/typography';

type BlogListProps = {
	posts:
		| Queries.BlogIndexQuery['allMarkdownRemark']['nodes']
		| Queries.TagsQuery['allMarkdownRemark']['nodes'];
};

const BlogList = ({ posts }: BlogListProps) => {
	const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;
	const { uiState } = useInstantSearch();
	return uiState[indexName].query ? (
		<Hits hitComponent={BlogPreview} />
	) : (
		<>
			{posts.map((node) => {
				const title = node.frontmatter.title || node.fields.slug;
				return (
					<div key={node.fields.slug}>
						<BlogInfo timeToRead={node.timeToRead} date={node.frontmatter.date} />
						<h3
							css={{
								marginTop: rhythm(1 / 4),
								marginBottom: rhythm(0.5),
							}}
						>
							<Link style={{ boxShadow: `none` }} to={node.fields.slug}>
								{title}
							</Link>
						</h3>
						<p
							css={{ marginBottom: rhythm(1.5) }}
							dangerouslySetInnerHTML={{
								__html: node.frontmatter.description || node.excerpt,
							}}
						/>
					</div>
				);
			})}
		</>
	);
};

export default BlogList;
