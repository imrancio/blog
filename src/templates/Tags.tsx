import React from 'react';
import { graphql, HeadProps, PageProps } from 'gatsby';
import { mediaMax } from '@divyanshu013/media';

import { ThemeProvider } from '../context/Theme';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Tags from '../components/Tags';
import { rhythm } from '../utils/typography';
import BlogList from '../components/BlogList';

type TagsPageContext = {
	tag: string;
};

const TagsPage = ({
	data,
	pageContext,
	location,
}: PageProps<Queries.TagsQuery, TagsPageContext>) => {
	const { tag } = pageContext;
	const posts = data.allMarkdownRemark.nodes;

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
					<BlogList posts={posts} />
				</Layout>
			</section>
		</ThemeProvider>
	);
};

export const pageQuery = graphql`
	query Tags($tag: String) {
		allMarkdownRemark(
			sort: { frontmatter: { date: DESC } }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			nodes {
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
`;

export default TagsPage;

export const Head = ({ pageContext }: HeadProps<Queries.TagsQuery, TagsPageContext>) => {
	const { tag } = pageContext;
	return <Seo description={`Personal blog of Imran Chowdhury: ${tag} posts`} />;
};
