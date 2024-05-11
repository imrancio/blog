import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { mediaMax } from '@divyanshu013/media';

import { ThemeProvider } from '../context/Theme';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Tags from '../components/Tags';
import { rhythm } from '../utils/typography';

const TagsIndex = ({ data, location }: PageProps<Queries.TagsIndexQuery>) => {
	const tags = data.allMarkdownRemark.group;
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
						<Tags list={tags} className="tags" />
						<h4>
							<Link to="/" rel="prev">
								← Home
							</Link>
						</h4>
					</div>
				</Layout>
			</section>
		</ThemeProvider>
	);
};

export const pageQuery = graphql`
	query TagsIndex {
		allMarkdownRemark {
			group(field: { frontmatter: { tags: SELECT } }) {
				fieldValue
				totalCount
			}
		}
	}
`;

export default TagsIndex;

export const Head = () => <Seo />;
