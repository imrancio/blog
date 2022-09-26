import type { GatsbyConfig } from 'gatsby';
import { COLOR_PRIMARY } from './src/hooks/useTheme';

/**
 * @type {GatsbyConfig}
 */
const gatsbyConfig: GatsbyConfig = {
	siteMetadata: {
		bio: `Life, music, code and things in between…`,
		title: `Imran Chowdhury`,
		author: `Imran Chowdhury`,
		description: `Personal blog of Imran Chowdhury`,
		domain: 'imranc.io',
		siteUrl: `https://blog.imranc.io`,
		/** must be a public github repo with issues feature enabled and connected to [utteranc.es](https://github.com/apps/utterances)  */
		repo: 'imrancio/blog',
		social: {
			linkedin: `https://www.linkedin.com/in/imrancio/`,
			twitter: `https://twitter.com/imrancio`,
			github: `https://github.com/imrancio`,
			youtube: `https://youtube.com/Imran51408s`,
			email: `mailto:imran@imranc.io`,
			stackoverflow: `https://stackoverflow.com/users/12705130/imran-chowdhury`,
			resume: `https://cdn.imranc.io/static/resume.pdf`,
		},
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: {
		typesOutputPath: `src/gatsby-types.d.ts`,
		generateOnBuild: true,
	},
	plugins: [
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				// You can add multiple tracking ids and a pageview event will be fired for all of them.
				trackingIds: [
					'UA-156431756-1', // Google Analytics / GA
				],
				// This object gets passed directly to the gtag config command
				// This config will be shared across all trackingIds
				gtagConfig: {
					cookie_expires: 0,
				},
				// This object is used for configuration specific to this plugin
				pluginConfig: {
					// Puts tracking script in the head instead of the body
					head: true,
					// Setting this parameter is also optional
					respectDNT: false,
				},
			},
		},
		`gatsby-plugin-emotion`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/posts`,
				name: `posts`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/pages`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-emojis',
						options: {
							// Deactivate the plugin globally (default: true)
							active: true,
							// Select the size (available size: 16, 24, 32, 64)
							size: 64,
							// Add custom styles
							styles: {
								display: 'inline',
								margin: '0',
								position: 'relative',
								width: '1.2em',
								'vertical-align': 'text-bottom',
							},
						},
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					{
						resolve: `gatsby-remark-autolink-headers`,
						options: {
							icon: `<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
							className: `autolink`,
							maintainCase: false,
							removeAccents: true,
							isIconAfterHeader: true,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					`gatsby-remark-external-links`,
				],
			},
		},
		`gatsby-plugin-image`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `{
					site {
						siteMetadata {
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}
				`,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.nodes.map((node) => {
								return Object.assign({}, node.frontmatter, {
									description: node.excerpt,
									date: node.frontmatter.date,
									url: site.siteMetadata.siteUrl + node.fields.slug,
									guid: site.siteMetadata.siteUrl + node.fields.slug,
									custom_elements: [{ 'content:encoded': node.html }],
								});
							});
						},
						query: `{
							allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
								nodes {
									excerpt
									html
									fields {
										slug
									}
									frontmatter {
										title
										date
									}
								}
							}
						}
						`,
						output: '/rss.xml',
						title: 'Imran C’s RSS Feed',
						// optional configuration to insert feed reference in pages:
						// if `string` is used, it will be used to create RegExp and then test if pathname of
						// current page satisfied this regular expression;
						// if not provided or `undefined`, all pages will have feed reference inserted
						match: '^/posts/',
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Imran C’s Blog`,
				short_name: `Imran`,
				start_url: `/`,
				background_color: `#121212`,
				theme_color: `#1d1d1d`,
				display: `minimal-ui`,
				icon: `static/favicon.png`,
				icon_options: {
					// For all the options available,
					// please see https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/#additional-resources.
					purpose: `any maskable`,
				},
			},
		},
		`gatsby-plugin-offline`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				color: COLOR_PRIMARY,
			},
		},
		{
			resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
			options: {
				devMode: false,
			},
		},
		'gatsby-plugin-catch-links',
		{
			resolve: 'gatsby-plugin-page-progress',
			options: {
				includePaths: [{ regex: '^/posts' }],
				height: 3,
				prependToBody: false,
				color: COLOR_PRIMARY,
			},
		},
		{
			resolve: `gatsby-plugin-s3`,
			options: {
				bucketName: 'blog.imranc.io',
				region: 'ap-southeast-1',
				protocol: 'https',
				hostname: 'blog.imranc.io',
			},
		},
	],
};

export default gatsbyConfig;
