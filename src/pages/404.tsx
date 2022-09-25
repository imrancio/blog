import React from 'react';
import { graphql, PageProps } from 'gatsby';

import { ThemeProvider } from '../context/Theme';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const NotFoundPage = ({ data, location }: PageProps<Queries.NotFoundQuery>) => {
	const siteTitle = data.site.siteMetadata.title;

	return (
		<ThemeProvider>
			<section css={{ height: '100%', minHeight: '100vh' }}>
				<Layout location={location} title={siteTitle}>
					<h1>Not Found</h1>
					<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
				</Layout>
			</section>
		</ThemeProvider>
	);
};

export const pageQuery = graphql`
	query NotFound {
		site {
			siteMetadata {
				title
			}
		}
	}
`;

export default NotFoundPage;

export const Head = () => <Seo title="404: Not Found" />;
