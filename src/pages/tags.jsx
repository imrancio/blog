import React from 'react';
import { Link, graphql } from 'gatsby';
import { object } from 'prop-types';
import { mediaMax } from '@divyanshu013/media';

import ThemeProvider from '../components/ThemeProvider';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Tags from '../components/Tags';
import BlogInfo from '../components/BlogInfo';
import { rhythm } from '../utils/typography';

const TagsIndex = ({ data, location }) => {
	const tags = data.allMarkdownRemark.group;
	tags.sort((t1, t2) => t2.totalCount - t1.totalCount);
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
					<Seo />
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

TagsIndex.propTypes = {
	data: object.isRequired,
	location: object.isRequired,
};

export const pageQuery = graphql`
	query {
		allMarkdownRemark {
			group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`;

export default TagsIndex;
