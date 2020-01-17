const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { kebabCase } = require('lodash');

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	const blogPost = path.resolve(`./src/templates/BlogPost.jsx`);
	const tagsTemplate = path.resolve(`./src/templates/Tags.jsx`);
	return graphql(
		`
			{
				postsRemark: allMarkdownRemark(
					sort: { fields: [frontmatter___date], order: DESC }
					limit: 1000
				) {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title
							}
						}
					}
				}
				tagsGroup: allMarkdownRemark {
					group(field: frontmatter___tags) {
						fieldValue
					}
				}
			}
		`,
	).then(result => {
		if (result.errors) {
			throw result.errors;
		}

		// Create blog posts pages.
		const posts = result.data.postsRemark.edges;
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
		const tags = result.data.tagsGroup.group;
		tags.forEach(tag => {
			createPage({
				path: `/tags/${kebabCase(tag.fieldValue)}/`,
				component: tagsTemplate,
				context: {
					tag: tag.fieldValue,
				},
			});
		});
		return null;
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value,
		});
	}
};

// create file type for ogImage
exports.sourceNodes = ({ actions }) => {
	const { createTypes } = actions;
	createTypes(`
	  type MarkdownRemarkFrontmatter {
		ogImage: File
	  }
  
	  type MarkdownRemark implements Node {
		frontmatter: MarkdownRemarkFrontmatter
	  }
	`);
};
