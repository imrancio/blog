import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function Seo({ description, lang, meta, title, image: imageProp }) {
	const { site, imageDefault } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						siteUrl
					}
				}
				imageDefault: file(absolutePath: { regex: "/assets/og-image/" }) {
					childImageSharp {
						fixed(height: 512, width: 512) {
							src
						}
					}
				}
			}
		`,
	);

	const metaDescription = description || site.siteMetadata.description;
	const ogImage =
		imageProp || site.siteMetadata.siteUrl.concat(imageDefault.childImageSharp.fixed.src);
	const ogTitle = title || site.siteMetadata.title;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={ogTitle}
			titleTemplate={title && `%s | ${site.siteMetadata.title}`}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: ogTitle,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: 'og:image',
					content: ogImage,
				},
				{
					name: `twitter:card`,
					content: `summary_large_image`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: ogTitle,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
				{
					name: 'twitter:image',
					content: ogImage,
				},
			].concat(meta)}
		/>
	);
}

Seo.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
};

Seo.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string,
	image: PropTypes.string,
};

export default Seo;
