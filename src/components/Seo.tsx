import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const SEO_QUERY = graphql`
	query Seo {
		site {
			siteMetadata {
				title
				description
				author
				siteUrl
				domain
			}
		}
		imageDefault: file(absolutePath: { regex: "/assets/og-image/" }) {
			childImageSharp {
				gatsbyImageData(layout: FIXED, height: 512, width: 512)
			}
		}
	}
`;

type SeoProps = {
	title?: string;
	description?: string;
	meta?: { name: string; content: string }[];
	image?: string;
	children?: ReactNode;
};

const Seo = ({ description, meta, title, image: imageProp, children }: SeoProps) => {
	const { site, imageDefault } = useStaticQuery<Queries.SeoQuery>(SEO_QUERY);

	const metaDescription = description || site.siteMetadata.description;
	const ogImage =
		imageProp ||
		site.siteMetadata.siteUrl.concat(
			imageDefault.childImageSharp.gatsbyImageData.images.fallback.src,
		);
	const ogTitle = title || site.siteMetadata.title;
	const ogMeta = [
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
	].concat(meta);

	return (
		<>
			<title>{ogTitle}</title>
			{ogMeta.map(({ name, content }, index) => (
				<meta key={index} name={name} content={content}></meta>
			))}
			{children}
		</>
	);
};

Seo.defaultProps = {
	meta: [],
	description: ``,
};

export default Seo;
