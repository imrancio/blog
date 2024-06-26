import React from 'react';
import { graphql, PageProps } from 'gatsby';

import { ThemeProvider } from '../context/Theme';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const AboutPage = ({ data, location }: PageProps<Queries.AboutQuery>) => {
	const siteTitle = data.site.siteMetadata.title;

	return (
		<ThemeProvider>
			<section css={{ height: '100%', minHeight: '100vh' }}>
				<Layout location={location} title={siteTitle}>
					<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
				</Layout>
			</section>
		</ThemeProvider>
	);
};

export const pageQuery = graphql`
	query About {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(fileAbsolutePath: { regex: "/about/" }) {
			frontmatter {
				title
			}
			html
		}
	}
`;

export default AboutPage;

export const Head = () => <Seo title="About" />;
