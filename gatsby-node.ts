import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { kebabCase } from 'lodash';
import type { GatsbyNode } from 'gatsby';

/**
 * @type {GatsbyNode['createPages']}
 */
export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const blogPost = path.resolve(`./src/templates/BlogPost.tsx`);
	const tagsTemplate = path.resolve(`./src/templates/Tags.tsx`);
	const result = await graphql<Queries.CreatePagesQuery>(
		`
			query CreatePages {
				posts: allMarkdownRemark(
					filter: { frontmatter: { title: { ne: "About" } } }
					sort: { frontmatter: { date: DESC } }
					limit: 1000
				) {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title
								external
							}
						}
					}
				}
				tags: allMarkdownRemark {
					group(field: { frontmatter: { tags: SELECT } }) {
						fieldValue
					}
				}
			}
		`,
	);

	if (result.errors) {
		throw result.errors;
	}

	// Create blog posts pages.
	const posts = result.data.posts.edges;
	posts.forEach((post, index) => {
		const previous = index === posts.length - 1 ? null : posts[index + 1].node;
		const next = index === 0 ? null : posts[index - 1].node;

		createPage({
			path: post.node.fields.slug,
			component: blogPost,
			context: {
				slug: post.node.fields.slug,
				previous,
				next,
			},
		});
	});
	// Create tag pages
	const tags = result.data.tags.group;
	tags.forEach((tag) => {
		createPage({
			path: `/tags/${kebabCase(tag.fieldValue)}/`,
			component: tagsTemplate,
			context: {
				tag: tag.fieldValue,
			},
		});
	});
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value: `/posts${value}`,
		});
	}
};
