import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { mediaMax } from '@divyanshu013/media';

import { ThemeProvider } from '../context/Theme';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogList from '../components/BlogList';

const BlogIndex = ({ data, location }: PageProps<Queries.BlogIndexQuery>) => {
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
					<BlogList posts={posts} />
				</Layout>
			</section>
		</ThemeProvider>
	);
};

export const pageQuery = graphql`
	query BlogIndex {
		allMarkdownRemark(
			filter: { frontmatter: { title: { ne: "About" } } }
			sort: { frontmatter: { date: DESC } }
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

export default BlogIndex;

export const Head = () => <Seo />;
