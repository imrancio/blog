import React from 'react';
import { Link, graphql, HeadProps, PageProps } from 'gatsby';
import { mediaMax } from '@divyanshu013/media';

import ThemeProvider from '../components/ThemeProvider';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogInfo from '../components/BlogInfo';
import Tags from '../components/Tags';
import { rhythm } from '../utils/typography';

type TagsPageContext = {
	tag: string;
};

const TagsPage = ({
	data,
	pageContext,
	location,
}: PageProps<Queries.TagsQuery, TagsPageContext>) => {
	const { tag } = pageContext;
	const posts = data.allMarkdownRemark.edges;

	return (
		<ThemeProvider>
			<section
				css={{
					display: 'grid',
					gridTemplateColumns: 'auto 1fr',
					alignContent: 'start',
					height: '100%',
					minHeight: '100vh',
					maxWidth: 1200,
					margin: '0 auto',
					[mediaMax.large]: {
						gridTemplateColumns: 'auto',
						justifyItems: 'center',
					},
				}}
			>
				<Sidebar />
				<Layout location={location}>
					<div css={{ marginTop: rhythm(1) }}>
						<Tags list={[tag]} cancel />
					</div>
					{posts.map(({ node }) => {
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
				</Layout>
			</section>
		</ThemeProvider>
	);
};

export const pageQuery = graphql`
	query Tags($tag: String) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
					}
					timeToRead
				}
			}
		}
	}
`;

export default TagsPage;

export const Head = ({ pageContext }: HeadProps<Queries.TagsQuery, TagsPageContext>) => {
	const { tag } = pageContext;
	return <Seo description={`Personal blog of Imran Chowdhury: ${tag} posts`} />;
};
