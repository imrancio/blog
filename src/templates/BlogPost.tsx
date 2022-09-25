import React from 'react';
import { Link, graphql, PageProps, HeadProps } from 'gatsby';

import Bio from '../components/Bio';
import Comments from '../components/Comments';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogInfo from '../components/BlogInfo';
import Tags from '../components/Tags';
import { rhythm } from '../utils/typography';
import ThemeProvider from '../components/ThemeProvider';
import ThemeContext from '../components/ThemeContext';
import { getTheme } from '../utils/theme';

type BlogPostPageContext = {
	slug: string;
	previous: {
		readonly fields: {
			readonly slug: string;
		};
		readonly frontmatter: {
			readonly title: string;
			readonly external: string;
		};
	};
	next: {
		readonly fields: {
			readonly slug: string;
		};
		readonly frontmatter: {
			readonly title: string;
			readonly external: string;
		};
	};
};

const BlogPost = ({
	data,
	pageContext,
	location,
}: PageProps<Queries.BlogPostQuery, BlogPostPageContext>) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata.title;
	const { previous, next } = pageContext;

	return (
		<ThemeProvider>
			<section css={{ height: '100%', minHeight: '100vh' }}>
				<ThemeContext.Consumer>
					{({ theme }) => (
						<Layout location={location} title={siteTitle}>
							<BlogInfo date={post.frontmatter.date} timeToRead={post.timeToRead} />
							<h1
								style={{
									marginTop: rhythm(1 / 4),
									marginBottom: rhythm(1),
								}}
							>
								{post.frontmatter.title}
							</h1>
							<Tags list={post.frontmatter.tags} />
							<div
								css={{
									a: {
										borderBottomColor: getTheme(theme).color,
									},
									hr: {
										borderBottom: `1px solid ${getTheme(theme).borderColor}`,
										height: 0,
										marginBottom: rhythm(1),
									},

									'table td, th': {
										borderBottom: `1px solid ${getTheme(theme).borderColor}`,
									},

									'.autolink': {
										borderBottom: `none`,
										WebkitTapHighlightColor: `transparent`,
										'&:hover, &:focus': {
											borderBottom: `none`,
										},
									},

									'.autolink svg': {
										fill: getTheme(theme).muted,
									},
								}}
								dangerouslySetInnerHTML={{ __html: post.html }}
							/>
							<hr
								style={{
									borderBottom: `1px solid ${getTheme(theme).borderColor}`,
									height: 0,
									marginBottom: rhythm(1),
								}}
							/>
							<Bio />
							<Comments />

							<ul
								style={{
									display: `flex`,
									flexWrap: `wrap`,
									justifyContent: `space-between`,
									listStyle: `none`,
									padding: 0,
									margin: `${rhythm(1)} 0`,
								}}
							>
								<li>
									{previous && (
										<h4>
											<Link to={previous.fields.slug} rel="prev">
												← {previous.frontmatter.title}
											</Link>
										</h4>
									)}
								</li>
								<li>
									{next && (
										<h4>
											<Link to={next.fields.slug} rel="next">
												{next.frontmatter.title} →
											</Link>
										</h4>
									)}
								</li>
							</ul>
						</Layout>
					)}
				</ThemeContext.Consumer>
			</section>
		</ThemeProvider>
	);
};

export const pageQuery = graphql`
	query BlogPost($slug: String!) {
		site {
			siteMetadata {
				title
				author
				siteUrl
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
				tags
				image {
					childImageSharp {
						gatsbyImageData(layout: FIXED, height: 128, width: 128)
					}
				}
			}
			timeToRead
		}
	}
`;

export default BlogPost;

export const Head = ({ data }: HeadProps<Queries.BlogPostQuery>) => {
	const post = data.markdownRemark;
	return (
		<Seo
			title={post.frontmatter.title}
			description={post.frontmatter.description || post.excerpt}
			image={
				post.frontmatter.image &&
				data.site.siteMetadata.siteUrl.concat(
					post.frontmatter.image.childImageSharp.gatsbyImageData.images.fallback.src,
				)
			}
		/>
	);
};
